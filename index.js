// i 每多少分钟
// h 每多少小时
// d 每多少天
// m 每多少月
// w 周几 1 星期日
// rand 是否随机 true 随机
// deep 是否深随机 true 深随机
// return string || bool
const cron = (type, value, rand = false, deep = false) => {
    let i = 0, h = 0, d = 0, m = 0, w = 0;
    switch (type) {
        case 'minute':
            i = value;
            break;
        case 'hour':
            h = value;
            break;
        case 'day':
            d = value;
            break;
        case 'month':
            m = value;
            break;
        case 'week':
            w = value;
            break;
    }
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

    if (i === 0 && (h > 0 || d > 0 || m > 0 || w > 0) && rand) {
        li.push(Math.floor(Math.random() * 59 + 1).toString());
    } else if (i === 0 && (h > 0 || d > 0 || m > 0 || w > 0)) {
        li.push('0');
    } else if (i === 0 || i === 1) {
        li.push('*');
    } else {
        if (rand && deep) {
            li.push(deepRandom('minute', i));
        } else {
            li.push('*/' + i.toString());
        }
    }

    if (i === 0 && h === 0 && (d > 0 || m > 0 || w > 0) && rand) {
        li.push(Math.floor(Math.random() * 23 + 1).toString());
    } else if (i === 0 && h === 0 && (d > 0 || m > 0 || w > 0)) {
        li.push('0');
    } else if (h === 0 || h === 1) {
        li.push('*');
    } else {
        if (rand && deep) {
            li.push(deepRandom('hour', h));
        } else {
            li.push('*/' + h.toString());
        }
    }

    if (i === 0 && h === 0 && d === 0 && (m > 0) && rand) {
        li.push(Math.floor(Math.random() * 27 + 2).toString());
    } else if (d === 0 && m > 0) {
        li.push('1');
    } else if (d === 0 || d === 1) {
        li.push('*');
    } else {
        if (rand && deep) {
            li.push(deepRandom('day', d));
        } else {
            li.push('*/' + d.toString());
        }
    }

    if (m === 0 || m === 1) {
        li.push('*');
    } else {
        if (rand && deep) {
            li.push(deepRandom('month', m));
        } else {
            li.push('*/' + m.toString());
        }
    }

    if (w === 0) {
        li.push('*');
    } else {
        li.push(w.toString());
    }
    return li.join(' ');
};

// * * * * *
// return object || bool
const parse = (str) => {
    let li = str.trim().split(' ');
    const reA = /^(\d+)$/;
    const reB = /^\*\/(\d+)$/;
    const reC = /^(\*\/\d+|\d+|\*)$/;
    li = li.filter(i => {
        return i.match(reC);
    });
    if (li.length !== 5) {
        return false;
    }

    let w = 0;
    if (li[4] === '*') {
        w = 0;
    } else if (li[4].match(reA)) {
        w = parseInt(li[4].match(reA)[1]);
        if (w < 1 || w > 7) {
            w = 0;
        }
    }

    let m = 0;
    if (li[3] === '*' && (li[2] !== '*' && !li[2].match(reB))) {
        m = 1;
    } else if (li[3].match(reB)) {
        m = parseInt(li[3].match(reB)[1]);
        if (m < 1 || m > 12) {
            m = 0;
        }
    }

    let d = 0;
    if (li[2] === '*' && (li[1] !== '*' && !li[1].match(reB))) {
        d = 1;
    } else if (li[2].match(reB)) {
        d = parseInt(li[2].match(reB)[1]);
        if (d < 1 || d > 30) {
            d = 0;
        }
    }

    let h = 0;
    if (li[1] === '*' && (li[0] !== '*' && !li[0].match(reB))) {
        h = 1;
    } else if (li[1].match(reA)) {
        h = parseInt(li[1].match(reA)[1]);
        if (h < 0 || h > 23) {
            h = 0;
        }
    } else if (li[1].match(reB)) {
        h = parseInt(li[1].match(reB)[1]);
        if (h < 0 || h > 23) {
            h = 0;
        }
    }

    let i = 0;
    if (li[0] === '*') {
        i = 1;
    } else if (li[0].match(reA)) {
        i = parseInt(li[0].match(reA)[1]);
        if (i < 0 || i > 59) {
            i = 0;
        }
    } else if (li[0].match(reB)) {
        i = parseInt(li[0].match(reB)[1]);
        if (i < 0 || i > 59) {
            i = 0;
        }
    }

    let type = '';
    let value = '';
    if (i > 0) {
        type = 'minute';
        value = i;
    }
    if (h > 0) {
        type = 'hour';
        value = h;
    }
    if (d > 0) {
        type = 'day';
        value = d;
    }
    if (m > 0) {
        type = 'month';
        value = m;
    }
    if (w > 0) {
        type = 'week';
        value = w;
    }
    let rand = i > 0;
    if (type === '') {
        return false;
    }
    return {
        'type': type,
        'value': value,
        'rand': rand
    };
};

const deepRandom = (t, v) => {
    let m = 0;
    let f = [];
    switch (t) {
        case 'minute':
            m = 59;
            // f.push(0);
            break;
        case 'hour':
            m = 23;
            // f.push(0);
            break;
        case 'day':
            m = 28;
            f.push(0);
            // f.push(1);
            break;
        case 'month':
            m = 12;
            f.push(0);
            // f.push(1);
            break;
    }
    let i = 0;
    let li = [];
    let r = Math.floor(Math.random() * v);
    for (; i < m; i += v) {
        let n = i + r;
        if (n > m) {
            continue;
        }
        if (f.indexOf(n) > -1) {
            continue;
        }
        li.push(n + '');
    }

    return li.join(',');
};

export {cron, parse};