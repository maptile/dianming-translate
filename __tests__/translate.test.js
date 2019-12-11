var translator = require('../index');

describe('正常且完整的记录内容', () => {
    test('按顺序，正常内容', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w minhang,zhuanqiao 6l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('6l');
    });


    test('呼号是5位的', () => {
        var data = 'bh4dk 59 58 i2730 zx50 15w minhang,zhuanqiao 6l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dk');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('6l');
    });

    test('呼号是小号', () => {
        var data = '211 59 58 i2730 zx50 15w minhang,zhuanqiao 6l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('211');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('6l');
    });

    test('功率是低档位', () => {
        var data = 'bh4dks 59 58 i2730 zx50 l minhang,zhuanqiao 6l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('l');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('6l');
    });

    test('功率是中档位', () => {
        var data = 'bh4dks 59 58 i2730 zx50 m minhang,zhuanqiao 6l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('m');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('6l');
    });

    test('功率是高档位', () => {
        var data = 'bh4dks 59 58 i2730 zx50 h minhang,zhuanqiao 6l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('h');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('6l');
    });

    test('功率是满功', () => {
        var data = 'bh4dks 59 58 i2730 zx50 f minhang,zhuanqiao 6l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('f');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('6l');
    });

    test('高度是地面', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w minhang,zhuanqiao 0l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('0l');
    });

    test('高度是1楼', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w minhang,zhuanqiao 1l';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('1l');
    });

    test('高度是米', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('设备是yaesu', () => {
        var data = 'bh4dks 59 58 y8800 zx50 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('y8800');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('设备是其他不知名品牌', () => {
        var data = 'bh4dks 59 58 hzt6900 zx50 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('hzt6900');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('设备是diy的', () => {
        var data = 'bh4dks 59 58 diy zx50 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('diy');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线是机带', () => {
        var data = 'bh4dks 59 58 i2730 jd 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('jd');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线是4单元八木', () => {
        var data = 'bh4dks 59 58 i2730 yagi 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('yagi');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线是4单元八木', () => {
        var data = 'bh4dks 59 58 i2730 4elyagi 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('4elyagi');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线是diy的', () => {
        var data = 'bh4dks 59 58 i2730 diy 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('diy');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线和设备都是diy的', () => {
        var data = 'bh4dks 59 58 diy diy 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('diy');
        expect(result.ant).toBe('diy');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线有高度', () => {
        var data = 'bh4dks 59 58 i2730 hh1.2mb 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('hh1.2mb');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线是名古屋', () => {
        var data = 'bh4dks 59 58 i2730 mgw2mb 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('mgw2mb');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线是其他牌子', () => {
        var data = 'bh4dks 59 58 i2730 5.2mb 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('5.2mb');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('天线是“车载苗子”', () => {
        var data = 'bh4dks 59 58 i2730 czant 15w minhang,zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('czant');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('minhang,zhuanqiao');
        expect(result.alt).toBe('12m');
    });

    test('qth没包含逗号', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w zhuanqiao 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('');
        expect(result.alt).toBe('12m');
    });

    test('qth是苏州相城区', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w suzhou,xiangchengqu 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });
});

describe('缺少部分内容', () => {
    test('只有我报的rst，没有对方报的rst', () => {
        var data = 'bh4dks 59 i2730 zx50 15w suzhou,xiangchengqu 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });

    test('没报功率', () => {
        var data = 'bh4dks 59 58 i2730 zx50 suzhou,xiangchengqu 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });

    test('没报高度', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w suzhou,xiangchengqu';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('');
    });

    test('没报qth', () => {
        var data = 'bh4dks 59 58 i2730 zx50 15w 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('');
        expect(result.alt).toBe('12m');
    });

    test('没报天线', () => {
        var data = 'bh4dks 59 58 i2730 15w suzhou,xiangchengqu 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });

    test('只有最少的信息：呼号、信号报告', () => {
        var data = 'bh4dks 59';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('');
        expect(result.rig).toBe('');
        expect(result.ant).toBe('');
        expect(result.pwr).toBe('');
        expect(result.qth).toBe('');
        expect(result.alt).toBe('');
    });
});


describe('顺序颠倒', () => {
    test('先说qth，再说其他', () => {
        var data = 'bh4dks 59 suzhou,xiangchengqu i2730 zx50 15w 12m 58';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });

    test('先说天线，再说设备', () => {
        var data = 'bh4dks 59 58 zx50 i2730 15w suzhou,xiangchengqu 12m';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });

    test('最后说天线和功率', () => {
        var data = 'bh4dks 59 58 i2730 suzhou,xiangchengqu 12m zx50 15w';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('58');
        expect(result.rig).toBe('i2730');
        expect(result.ant).toBe('zx50');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });

    test('乱序输入1', () => {
        var data = 'bh4dks 59 x520 pipeng2730 suzhou,xiangchengqu 12m 15w';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('');
        expect(result.rig).toBe('x520');
        expect(result.ant).toBe('pipeng2730');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });

    test('乱序输入2', () => {
        var data = 'bh4dks suzhou,xiangchengqu pipeng2730 1.2mb 15w 12m 59';
        var result = translator.translate(data);

        expect(result.callsign).toBe('bh4dks');
        expect(result.rst1).toBe('59');
        expect(result.rst2).toBe('');
        expect(result.rig).toBe('pipeng2730');
        expect(result.ant).toBe('1.2mb');
        expect(result.pwr).toBe('15w');
        expect(result.qth).toBe('suzhou,xiangchengqu');
        expect(result.alt).toBe('12m');
    });
});

describe('缺少内容', () => {
    test('输入为空', () => {
        var data = '';
        var result = translator.translate(data);

        expect(result.callsign).toBe('');
        expect(result.rst1).toBe('');
        expect(result.rst2).toBe('');
        expect(result.rig).toBe('');
        expect(result.ant).toBe('');
        expect(result.pwr).toBe('');
        expect(result.qth).toBe('');
        expect(result.alt).toBe('');
    });

    test('仅有几个字母', () => {
        var data = 'bh4';
        var result = translator.translate(data);

        expect(result.callsign).toBe('');
        expect(result.rst1).toBe('');
        expect(result.rst2).toBe('');
        expect(result.rig).toBe('bh4');
        expect(result.ant).toBe('');
        expect(result.pwr).toBe('');
        expect(result.qth).toBe('');
        expect(result.alt).toBe('');
    });
});
