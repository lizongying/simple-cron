// i 每多少分钟
// h 每多少小时
// d 每多少天
// m 每多少月
// w 周几 1 星期日
// rand 是否随机 true 随机
// deep 是否深随机 true 深随机
// return string || bool
const cron = (type, value, rand = false, deep = false) => {
    if (typeof (value) !== 'number') {
        return false;
    }
    if (typeof (rand) !== 'boolean') {
        return false;
    }
    if (typeof (deep) !== 'boolean') {
        return false;
    }
    let i = '*', h = '*', d = '*', m = '*', w = '*';
    switch (type) {
        case 'minute':
            if (value < 1 || value > 59) {
                return false;
            }
            if (value === 1) {
            } else if (deep) {
                i = deepRandom('minute', value);
            } else {
                i = '*/' + value.toString();
            }
            return [i, h, d, m, w].join(' ');
        case 'hour':
            if (value < 1 || value > 23) {
                return false;
            }
            if (rand || deep) {
                i = Math.floor(Math.random() * 60).toString();
            } else {
                i = '0';
            }
            if (value === 1) {
            } else if (deep) {
                h = deepRandom('hour', value);
            } else {
                h = '*/' + value.toString();
            }
            return [i, h, d, m, w].join(' ');
        case 'day':
            if (value < 1 || value > 28) {
                return false;
            }
            if (rand || deep) {
                i = Math.floor(Math.random() * 60).toString();
                h = Math.floor(Math.random() * 24).toString();
            } else {
                i = '0';
                h = '0';
            }
            if (value === 1) {
            } else if (deep) {
                d = deepRandom('day', value);
            } else {
                d = '*/' + value.toString();
            }
            return [i, h, d, m, w].join(' ');
        case 'month':
            if (value < 1 || value > 12) {
                return false;
            }
            if (rand || deep) {
                i = Math.floor(Math.random() * 60).toString();
                h = Math.floor(Math.random() * 24).toString();
                d = Math.floor(Math.random() * 28 + 1).toString();
            } else {
                i = '0';
                h = '0';
                d = '1';
            }
            if (value === 1) {
            } else if (deep) {
                m = deepRandom('month', value);
            } else {
                m = '*/' + value.toString();
            }
            return [i, h, d, m, w].join(' ');
        case 'week':
            if (value < 1 || value > 7) {
                return false;
            }
            if (rand || deep) {
                i = Math.floor(Math.random() * 60).toString();
                h = Math.floor(Math.random() * 24).toString();
            } else {
                i = '0';
                h = '0';
            }
            w = value.toString();
            return [i, h, d, m, w].join(' ');
        default:
            return false;
    }
};

// * * * * *
// return object || bool
const parse = (str) => {
    let li = str.trim().split(' ');
    const reA = /^(\d+)$/;
    const reB = /^\*\/(\d+)$/;
    const reC = /^([\d,]+)$/;
    const reD = /^(\*\/\d+|\d+|\*|[\d,]+)$/;

    li = li.filter(i => {
        return i.match(reD);
    });
    if (li.length !== 5) {
        return false;
    }

    let w = 0;
    if (li[4] === '*') {
    } else if (li[4].match(reA)) {
        w = parseInt(li[4].match(reA)[1]);
        if (w < 1 || w > 7) {
            return false;
        }
    }

    let m = 0;
    if (li[3] === '*' && (li[2] !== '*' && !li[2].match(reB))) {
        m = 1;
    } else if (li[3].match(reB)) {
        m = parseInt(li[3].match(reB)[1]);
        if (m < 1 || m > 12) {
            return false;
        }
    }

    let d = 0;
    if (li[2] === '*' && (li[1] !== '*' && !li[1].match(reB))) {
        d = 1;
    } else if (li[2].match(reB)) {
        d = parseInt(li[2].match(reB)[1]);
        if (d < 1 || d > 28) {
            d = 0;
        }
    } else if (li[2].match(reC)) {
        const z = li[2].match(reC)[1].split(',');
        z.forEach((v, k) => {
            if (k === 0) {
                return;
            }
            const n = parseInt(v) - parseInt(z[k - 1]);
            if (n < 1) {
                return;
            }
            if (d === 0) {
                d = n;
            }
            if (d !== n) {
                d = -1;
            }
        });
        if (parseInt(z[0]) > d - 1) {
            d = 0;
        }
        if (parseInt(z[z.length - 1]) > 28) {
            return false;
        }
        if (parseInt(z[z.length - 1]) + d < 29) {
            d = 0;
        }
        if (d < 1 || d > 28) {
            d = 0;
        }
        if (d > 0) {
            m = 0;
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
    } else if (li[1].match(reC)) {
        const z = li[1].match(reC)[1].split(',');
        z.forEach((v, k) => {
            if (k === 0) {
                return;
            }
            const n = parseInt(v) - parseInt(z[k - 1]);
            if (n < 1) {
                return;
            }
            if (h === 0) {
                h = n;
            }
            if (h !== n) {
                h = -1;
            }
        });
        if (parseInt(z[0]) > h - 1) {
            h = 0;
        }
        if (parseInt(z[z.length - 1]) > 23) {
            return false;
        }
        if (parseInt(z[z.length - 1]) + h < 24) {
            h = 0;
        }
        if (h < 0 || h > 23) {
            h = 0;
        }
        if (h > 0) {
            d = 0;
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
    } else if (li[0].match(reC)) {
        const z = li[0].match(reC)[1].split(',');
        z.forEach((v, k) => {
            if (k === 0) {
                return;
            }
            const n = parseInt(v) - parseInt(z[k - 1]);
            if (n < 1) {
                return;
            }
            if (i === 0) {
                i = n;
            }
            if (i !== n) {
                i = -1;
            }
        });
        if (parseInt(z[0]) > i - 1) {
            i = 0;
        }
        if (parseInt(z[z.length - 1]) > 59) {
            return false;
        }
        if (parseInt(z[z.length - 1]) + i < 60) {
            i = 0;
        }
        if (i < 0 || i > 59) {
            i = 0;
        }
        if (i > 0) {
            h = 0;
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
    let i = 0;
    switch (t) {
        case 'minute':
            m = 59;
            break;
        case 'hour':
            m = 23;
            break;
        case 'day':
            m = 28;
            i = 1;
            break;
        case 'month':
            m = 12;
            i = 1;
            break;
    }

    let li = [];
    let r = Math.floor(Math.random() * v);
    for (; i < m; i += v) {
        let n = i + r;
        if (n > m) {
            continue;
        }
        li.push(n.toString());
    }

    return li.join(',');
};

export {cron, parse};