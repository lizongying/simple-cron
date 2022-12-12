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
            if (value < 1 || value > 31) {
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

                // not contain 29-31
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
    const reNum = /^(\d+)$/;
    const reStar = /^\*\/(\d+)$/;
    const reSeg = /^([\d,]+)$/;
    const reAll = /^(\*\/\d+|\d+|\*|[\d,]+)$/;

    li = li.filter(i => {
        return i.match(reAll);
    });
    if (li.length !== 5) {
        return false;
    }

    let rand = false;
    let deepRand = false;

    let i = 0;
    if (li[0] === '*') {
        i = 1;
    } else if (li[0].match(reNum)) {
        i = parseInt(li[0].match(reNum)[1]);
        if (i < 0 || i > 59) {
            return false;
        }
        if (i > 0) {
            rand = true;
        }
        i = 0;
    } else if (li[0].match(reStar)) {
        i = parseInt(li[0].match(reStar)[1]);
        if (i < 1 || i > 59) {
            return false;
        }
    } else if (li[0].match(reSeg)) {
        const z = li[0].match(reSeg)[1].split(',');
        z.every((v, k) => {
            if (k === 0) {
                return true;
            }
            const n = parseInt(v) - parseInt(z[k - 1]);
            if (n < 1) {
                return false;
            }
            if (i === 0) {
                i = n;
                return true;
            }
            if (i !== n) {
                i = -1;
                return false;
            }
        });
        if (parseInt(z[0]) < 0) {
            return false;
        }
        if (parseInt(z[0]) > i - 1) {
            return false;
        }
        if (parseInt(z[z.length - 1]) > 59) {
            return false;
        }
        if (parseInt(z[z.length - 1]) < 60 - i) {
            return false;
        }
        if (i < 1 || i > 59) {
            return false;
        }
        rand = true;
        deepRand = true;
    } else {
        return false;
    }

    let h = 0;
    if (li[1] === '*') {
        if (li[0].match(reNum)) {
            h = 1;
        }
    } else if (li[1].match(reNum)) {
        h = parseInt(li[1].match(reNum)[1]);
        if (h < 0 || h > 23) {
            return false;
        }
        if (h > 0) {
            rand = true;
        }
        h = 0;
    } else if (li[1].match(reStar)) {
        h = parseInt(li[1].match(reStar)[1]);
        if (h < 1 || h > 23) {
            return false;
        }
    } else if (li[1].match(reSeg)) {
        const z = li[1].match(reSeg)[1].split(',');
        z.every((v, k) => {
            if (k === 0) {
                return true;
            }
            const n = parseInt(v) - parseInt(z[k - 1]);
            if (n < 1) {
                return false;
            }
            if (h === 0) {
                h = n;
                return true;
            }
            if (h !== n) {
                h = -1;
                return false;
            }
        });
        if (parseInt(z[0]) < 0) {
            return false;
        }
        if (parseInt(z[0]) > h - 1) {
            return false;
        }
        if (parseInt(z[z.length - 1]) > 23) {
            return false;
        }
        if (parseInt(z[z.length - 1]) < 24 - h) {
            return false;
        }
        if (h < 0 || h > 23) {
            return false;
        }
        rand = true;
        deepRand = true;
    } else {
        return false;
    }

    let d = 0;
    if (li[2] === '*') {
        if (li[1].match(reNum)) {
            d = 1;
        }
    } else if (li[2].match(reNum)) {
        d = parseInt(li[2].match(reNum)[1]);
        if (d < 1 || d > 31) {
            return false;
        }
        if (d > 1) {
            rand = true;
        }
        d = 0;
    } else if (li[2].match(reStar)) {
        d = parseInt(li[2].match(reStar)[1]);
        if (d < 1 || d > 31) {
            return false;
        }
    } else if (li[2].match(reSeg)) {
        const z = li[2].match(reSeg)[1].split(',');
        z.every((v, k) => {
            if (k === 0) {
                return true;
            }
            const n = parseInt(v) - parseInt(z[k - 1]);
            if (n < 1) {
                return false;
            }
            if (d === 0) {
                d = n;
                return true;
            }
            if (d !== n) {
                d = -1;
                return false;
            }
        });
        if (parseInt(z[0]) < 1) {
            return false;
        }
        if (parseInt(z[0]) > d) {
            return false;
        }
        if (parseInt(z[z.length - 1]) > 31) {
            return false;
        }
        // 为了兼容之前的错误，暂时注释
        // if (parseInt(z[z.length - 1]) < 32 - d) {
        //     return false;
        // }
        if (d < 1 || d > 31) {
            return false;
        }
        rand = true;
        deepRand = true;
    } else {
        return false;
    }

    let m = 0;
    if (li[3] === '*') {
        if (li[2].match(reNum)) {
            m = 1;
        }
    } else if (li[3].match(reNum)) {
        m = parseInt(li[3].match(reNum)[1]);
        if (m < 1 || m > 12) {
            return false;
        }
        if (m > 1) {
            rand = true;
        }
        m = 0;
    } else if (li[3].match(reStar)) {
        m = parseInt(li[3].match(reStar)[1]);
        if (m < 1 || m > 12) {
            return false;
        }
    } else if (li[3].match(reSeg)) {
        const z = li[3].match(reSeg)[1].split(',');
        z.every((v, k) => {
            if (k === 0) {
                return true;
            }
            const n = parseInt(v) - parseInt(z[k - 1]);
            if (n < 1) {
                return false;
            }
            if (m === 0) {
                m = n;
                return true;
            }
            if (m !== n) {
                m = -1;
                return false;
            }
        });
        if (parseInt(z[0]) < 1) {
            return false;
        }
        if (parseInt(z[0]) > m) {
            return false;
        }
        if (parseInt(z[z.length - 1]) > 12) {
            return false;
        }
        if (parseInt(z[z.length - 1]) < 13 - m) {
            return false;
        }
        if (m < 1 || m > 12) {
            return false;
        }
        rand = true;
        deepRand = true;
    } else {
        return false;
    }

    let w = 0;
    if (li[4] === '*') {
    } else if (li[4].match(reNum)) {
        w = parseInt(li[4].match(reNum)[1]);
        if (w < 1 || w > 7) {
            return false;
        }
    } else {
        return false;
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
    if (type === '') {
        return false;
    }
    return {
        'type': type, 'value': value, 'rand': rand, 'deepRand': deepRand
    };
};

const deepRandom = (t, v) => {
    let m = 0;
    let i = 0;
    switch (t) {
        case 'minute':
            m = 60;
            break;
        case 'hour':
            m = 24;
            break;
        case 'day':
            m = 32;
            i = 1;
            break;
        case 'month':
            m = 13;
            i = 1;
            break;
    }

    let li = [];
    let r = Math.floor(Math.random() * v);
    for (; i < m; i += v) {
        let n = i + r;
        if (n >= m) {
            continue;
        }
        li.push(n.toString());
    }

    return li.join(',');
};

export {cron, parse};