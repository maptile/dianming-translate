var _ = require('lodash');

function transform(record) {
    var arr = record.split(' ');
    var obj = {
        callsign: '',
        rst1: '',
        rst2: '',
        rig: '',
        ant: '',
        pwr: '',
        qth: '',
        alt: '',
    };

    obj.others = arr;

    return obj;
}

function getMatched(record, regstr, propName) {
    for(var index = 0; index < record.others.length; index++){
        var value = record.others[index];

        if (value.match(regstr)) {
            if (record[propName]) {
                return record;
            }

            record.others.splice(index, 1);
            record[propName] = value;
            return record;
        }
    }

    return record;
}

function getAlt(record) {
    var regstr = /^\d+[mM]$|^\d+[lL]$/g;

    return getMatched(record, regstr, 'alt');
}

function getCallsign(record) {
    var regstr = /^[a-zA-Z][a-zA-Z][0-9][a-zA-Z]{1,3}$|^\d\d\d$/g;

    return getMatched(record, regstr, 'callsign');
}

function getPwr(record) {
    var regstr = /^\d+[wW]$|^[fFhHmMlL]$/g;
    return getMatched(record, regstr, 'pwr');
}

function tryGetRstByOrder(record, regstr, propName) {
    if(record.others.legth === 0){
        return record;
    }

    var rstPattern = /^[1-5][0-9]$/gm; // eg. 59 asd 49

    var allLeftChars = record.others.join('\n');

    var matches = allLeftChars.match(rstPattern);

    var rstProps = ['rst1', 'rst2'];

    if(!matches || matches.length === 0){
        return record;
    }

    var trimmedMatches = _.map(matches, function(value) {
        return _.trim(value);
    });

    rstProps.forEach(function(prop, index) {
        if(!_.isUndefined(trimmedMatches[index])){
            record[prop] = trimmedMatches[index];
        }
    });

    record.others = _.difference(record.others, trimmedMatches);

    return record;
}

function getRst(record) {
    var regstrFullForm = /^[1-5][0-9]\/[1-5][0-9]$/g; // eg. "59/59"
    var onlyMyReportRstPattern = /^[1-5][0-9]\/$/g; // eg. "59/"
    var onlyTheirReportRstPattern = /^\/[1-5][0-9]$/g; // eg. "/59"

    record = getMatched(record, regstrFullForm, 'rst1');

    if (record.rst1) {
        var temp = record.rst1.split('/');
        if (temp.length === 2) {
            record.rst1 = temp[0];
            record.rst2 = temp[1];
        }

        return record;
    }

    record = getMatched(record, onlyMyReportRstPattern, 'rst1');
    record.rst1 = record.rst1.replace('/', '');

    record = getMatched(record, onlyTheirReportRstPattern, 'rst2');
    record.rst2 = record.rst2.replace('/', '');

    if (!record.rst1 || !record.rst2) {
        record = tryGetRstByOrder(record);
    }

    return record;
}

function getQth(record) {
    var propName = 'qth';

    for(var index = 0; index < record.others.length; index++){
        var value = record.others[index];

        if (value.indexOf(',') !== -1) {
            if (record[propName]) {
                return record;
            }

            record.others.splice(index, 1);
            record[propName] = value;
            return record;
        }
    }

    // var longestStrIndex, longestStr = '';
    // for (var index in record.others) {
    //     var value = record.others[index];

    //     if(value.length > longestStr.length){
    //         longestStr = value;
    //         longestStrIndex = index;
    //     }
    // }

    // record.others.splice(longestStrIndex, 1);
    // record[propName] = longestStr;

    return record;
}

function getPrefixedValue(record, propName, brands){
    for(var index = 0; index < record.others.length; index++){
        var value = record.others[index].toLowerCase();

        var matchedObj = _.find(brands, function(brand){
            return _.startsWith(value, brand);
        });

        if(matchedObj){
            record.others.splice(index, 1);
            record[propName] = value;
            return record;
        }
    }

    return record;
}

function getRig(record){
    var brands = ['y', 'i', 'k', 'm', 'o', 'b', 'bf', 'vn', 'tyt', 'hyt'];

    return getPrefixedValue(record, 'rig', brands);
}

function getAtt(record){
    var brands = ['z', 'l', 'hh', 'hx', 'mgw'];

    return getPrefixedValue(record, 'ant', brands);
}

function getUncertainRigAndAtt(record){
    if(!record.rig && record.others.length > 0){
        record.rig = record.others[0];
        record.others.splice(0, 1);
    }

    if(!record.ant && record.others.length > 0){
        record.ant = record.others[0];
        record.others.splice(0, 1);
    }

    return record;
}

module.exports = {
    translate: function(record){
        var recordObj = transform(record);

        recordObj = getCallsign(recordObj);
        recordObj = getAlt(recordObj);
        recordObj = getPwr(recordObj);
        recordObj = getRst(recordObj);
        recordObj = getQth(recordObj);
        recordObj = getRig(recordObj);
        recordObj = getAtt(recordObj);
        recordObj = getUncertainRigAndAtt(recordObj);

        return recordObj;
    }
};

// https://zh.wikipedia.org/wiki/
// %E4%B8%8A%E6%B5%B7%E5%B8%82%E4%B9%A1%E7%BA%A7%E4%BB%A5%E4%B8%8A%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%97%E8%A1%A8
