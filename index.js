// i 每多少分钟
// h 每多少小时
// d 每多少天
// m 每多少月
// w 周几 1 星期日
// r 是否随机 true 随机
const cron = (i = 0, h = 0, d = 0, m = 0, w = 0, r = false) => {
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

    if (i === 0 && (h > 0 || d > 0 || m > 0 || w > 0) && r) {
        li.push(Math.floor(Math.random() * 59 + 1).toString());
    } else if (i === 0 && (h > 0 || d > 0 || m > 0 || w > 0)) {
        li.push('0');
    } else if (i === 0 || i === 1) {
        li.push('*');
    } else {
        li.push('*/' + i.toString());
    }

    if (i === 0 && h === 0 && (d > 0 || m > 0 || w > 0) && r) {
        li.push(Math.floor(Math.random() * 23 + 1).toString());
    } else if (i === 0 && h === 0 && (d > 0 || m > 0 || w > 0)) {
        li.push('0');
    } else if (h === 0 || h === 1) {
        li.push('*');
    } else {
        li.push('*/' + h.toString());
    }

    if (i === 0 && h === 0 && d === 0 && r && (m > 0)) {
        li.push(Math.floor(Math.random() * 27 + 2).toString());
    } else if (d === 0 && m > 0) {
        li.push('1');
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

// * * * * *
const parse = (str) => {
    let li = str.split(' ');
    const reA = /^(\d+)$/;
    const reB = /^\*\/(\d)$/;

    if (li[4] === '*') {
        li[4] = 0;
    } else if (li[4].match(reA)) {
        let w = parseInt(li[4].match(reA)[1]);
        if (w < 1 || w > 7) {
            li[4] = 0;
        } else {
            li[4] = w;
        }
    } else {
        li[4] = 0;
    }

    if (li[3] === '*' && (li[2] !== '*' && !li[2].match(reB))) {
        li[3] = 1;
    } else if (li[3].match(reB)) {
        let m = parseInt(li[3].match(reB)[1]);
        if (m < 1 || m > 12) {
            li[3] = 0;
        } else {
            li[3] = m;
        }
    } else {
        li[3] = 0;
    }

    if (li[2] === '*' && (li[1] !== '*' && !li[1].match(reB))) {
        li[2] = 1;
    } else if (li[2].match(reB)) {
        let m = parseInt(li[2].match(reB)[1]);
        if (m < 1 || m > 30) {
            li[2] = 0;
        } else {
            li[2] = m;
        }
    } else {
        li[2] = 0;
    }

    if (li[1] === '*' && (li[0] !== '*' && !li[0].match(reB))) {
        li[1] = 1;
    } else if (li[1].match(reA)) {
        let h = parseInt(li[1].match(reA)[1]);
        if (h < 0 || h > 23) {
            li[1] = 0;
        } else {
            li[1] = h;
        }
    } else if (li[1].match(reB)) {
        let h = parseInt(li[1].match(reB)[1]);
        if (h < 0 || h > 23) {
            li[1] = 0;
        } else {
            li[1] = h;
        }
    } else {
        li[1] = 0;
    }

    if (li[0] === '*') {
        li[0] = 1;
    } else if (li[0].match(reA)) {
        let i = parseInt(li[0].match(reA)[1]);
        if (i < 0 || i > 59) {
            li[0] = 0;
        } else {
            li[0] = i;
        }
    } else if (li[0].match(reB)) {
        let i = parseInt(li[0].match(reB)[1]);
        if (i < 0 || i > 59) {
            li[0] = 0;
        } else {
            li[0] = i;
        }
    } else {
        li[0] = 0;
    }

    if (li[4] > 0) {
        if (li[0] > 0) {
            li[0] = 0;
            li[1] = 0;
            li[2] = 0;
            li[3] = 0;
            li.push(true);
        } else {
            li.push(false);
        }
        return li;
    }

    if (li[3] > 0) {
        if (li[0] > 0) {
            li[0] = 0;
            li[1] = 0;
            li[2] = 0;
            li.push(true);
        } else {
            li.push(false);
        }
        return li;
    }

    if (li[2] > 0) {
        if (li[0] > 0) {
            li[0] = 0;
            li[1] = 0;
            li.push(true);
        } else {
            li.push(false);
        }
        return li;
    }

    if (li[1] > 0) {
        if (li[0] > 0) {
            li[0] = 0;
            li.push(true);
        } else {
            li.push(false);
        }
        return li;
    }

    if (li[0] > 0) {
        li.push(false);
        return li;
    }

    li.push(false);
    return li;
};

export {cron, parse};