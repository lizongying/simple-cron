// i 每多少分钟
// h 每多少小时
// d 每多少天
// m 每多少月
// w 周几 1 星期日
// r 是否随机 true 随机
const simpleCron = (i = 0, h = 0, d = 0, m = 0, w = 0, r = false) => {
    if (i < 0 || i > 60) {
        return false;
    }
    if (h < 0 || h > 24) {
        return false;
    }
    if (d < 0 || d > 30) {
        return false;
    }
    if (m < 0 || m > 12) {
        return false;
    }
    if (w < 0 || w > 7) {
        return false;
    }
    let li = [];
    if (i === 0 && r && (h > 0 || d > 0 || m > 0 || w > 0)) {
        li.push(Math.floor(Math.random() * 60).toString());
    } else if (i === 0) {
        li.push('0');
    } else if (i === 1) {
        li.push('*');
    } else {
        li.push('*/' + i.toString());
    }

    if (i === 0 && h === 0 && r && (d > 0 || m > 0 || w > 0)) {
        li.push(Math.floor(Math.random() * 24).toString());
    } else if (i === 0 && h === 0) {
        li.push('0');
    } else if (h === 0 || h === 1) {
        li.push('*');
    } else {
        li.push('*/' + h.toString());
    }

    if (i === 0 && h === 0 && d === 0 && r && (m > 0)) {
        li.push(Math.floor(Math.random() * 28 + 1).toString());
    } else if (d === 0 || d === 1) {
        li.push('*');
    } else {
        li.push('*/' + d.toString());
    }

    if (m === 0 || m === 1) {
        li.push('*');
    } else {
        li.push('*/' + m.toString());
    }

    if (w === 0) {
        li.push('*');
    } else {
        li.push(w.toString());
    }
    return li.join(' ');
};


const test = () => {

// 默认
    console.log('默认', false, simpleCron(0, 0, 0, 0, 0, false));
    console.log('默认', true, simpleCron(0, 0, 0, 0, 0, true));

// 每1分钟
    console.log('每1分钟', false, simpleCron(1, 0, 0, 0, 0, false));
    console.log('每1分钟', true, simpleCron(1, 0, 0, 0, 0, true));

// 每2分钟
    console.log('每2分钟', false, simpleCron(2, 0, 0, 0, 0, false));
    console.log('每2分钟', true, simpleCron(2, 0, 0, 0, 0, true));

// 每1小时
    console.log('每1小时', false, simpleCron(0, 1, 0, 0, 0, false));
    console.log('每1小时', true, simpleCron(0, 1, 0, 0, 0, true));

// 每2小时
    console.log('每2小时', false, simpleCron(0, 2, 0, 0, 0, false));
    console.log('每2小时', true, simpleCron(0, 2, 0, 0, 0, true));

// 每1天
    console.log('每1天', false, simpleCron(0, 0, 1, 0, 0, false));
    console.log('每1天', true, simpleCron(0, 0, 1, 0, 0, true));

// 每2天
    console.log('每2天', false, simpleCron(0, 0, 2, 0, 0, false));
    console.log('每2天', true, simpleCron(0, 0, 2, 0, 0, true));

// 1月
    console.log('每1月', false, simpleCron(0, 0, 0, 1, 0, false));
    console.log('每1月', true, simpleCron(0, 0, 0, 1, 0, true));

// 2月
    console.log('每2月', false, simpleCron(0, 0, 0, 2, 0, false));
    console.log('每2月', true, simpleCron(0, 0, 0, 2, 0, true));

// 周日
    console.log('周日', false, simpleCron(0, 0, 0, 0, 1, false));
    console.log('周日', true, simpleCron(0, 0, 0, 0, 1, true));

// 周一
    console.log('周一', false, simpleCron(0, 0, 0, 0, 2, false));
    console.log('周一', true, simpleCron(0, 0, 0, 0, 2, true));
};


module.exports = {
    'simpleCron': simpleCron,
    'test': test,
};