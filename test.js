import {cron, parse} from './index.js';

import parser from 'cron-parser';

const {parseExpression} = parser;

const testCron = () => {

    // 默认
    console.log('默认', false, cron('', 0, false));
    console.log('默认', true, cron('', 0, true));

    // 每1分钟
    console.log('每分钟', false, cron('minute', 1, false));
    console.log('每分钟', true, cron('minute', 1, true));

    // 每2分钟
    console.log('每2分钟', false, cron('minute', 2, false));
    console.log('每2分钟', true, cron('minute', 2, true));

    // 每小时
    console.log('每小时', false, cron('hour', 1, false));
    console.log('每小时', true, cron('hour', 1, true));

    // 每2小时
    console.log('每2小时', false, cron('hour', 2, false));
    console.log('每2小时', true, cron('hour', 2, true));

    // 每天
    console.log('每天', false, cron('day', 1, false));
    console.log('每天', true, cron('day', 1, true));

    // 每2天
    console.log('每2天', false, cron('day', 2, false));
    console.log('每2天', true, cron('day', 2, true));

    // 每个月
    console.log('每个月', false, cron('month', 1, false));
    console.log('每个月', true, cron('month', 1, true));

    // 每2个月
    console.log('每2个月', false, cron('month', 2, false));
    console.log('每2个月', true, cron('month', 2, true));

    // 周日
    console.log('周日', false, cron('week', 1, false));
    console.log('周日', true, cron('week', 1, true));

    // 周一
    console.log('周一', false, cron('week', 2, false));
    console.log('周一', true, cron('week', 2, true));
};

const testParse = () => {

    // 默认
    console.log('默认', false, '* * * * *', parse('* * * * *'));
    console.log('默认', true, '* * * * *', parse('* * * * *'));

    // 每分钟
    console.log('每分钟', false, '* * * * *', parse('* * * * *'));
    console.log('每分钟', true, '* * * * *', parse('* * * * *'));

    // 每2分钟
    console.log('每2分钟', false, '*/2 * * * *', parse('*/2 * * * *'));
    console.log('每2分钟', true, '*/2 * * * *', parse('*/2 * * * *'));

    // 每小时
    console.log('每小时', false, '0 * * * *', parse('0 * * * *'));
    console.log('每小时', true, '1 * * * *', parse('1 * * * *'));

    // 每2小时
    console.log('每2小时', false, '0 */2 * * *', parse('0 */2 * * *'));
    console.log('每2小时', true, '1 */2 * * *', parse('1 */2 * * *'));

    // 每天
    console.log('每天', false, '0 0 * * *', parse('0 0 * * *'));
    console.log('每天', true, '1 2 * * *', parse('1 2 * * *'));

    // 每2天
    console.log('每2天', false, '0 0 */2 * *', parse('0 0 */2 * *'));
    console.log('每2天', true, '1 2 */2 * *', parse('1 2 */2 * *'));

    // 每个月
    console.log('每个月', false, '0 0 1 * *', parse('0 0 1 * *'));
    console.log('每个月', true, '1 2 2 * *', parse('1 2 2 * *'));

    // 每2个月
    console.log('每2个月', false, '0 0 1 */2 *', parse('0 0 1 */2 *'));
    console.log('每2个月', true, '1 2 2 */2 *', parse('1 2 2 */2 *'));

    // 周日
    console.log('周日', false, '* * * * 1', parse('* * * * 1'));
    console.log('周日', true, '1 2 * * 1', parse('1 2 * * 1'));

    // 周一
    console.log('周一', false, '* * * * 2', parse('* * * * 2'));
    console.log('周一', true, '1 2 * * 2', parse('1 2 * * 2'));
};

testCron();
testParse();

try {
    const interval = parseExpression(cron(0, 0, 2, 0, 0, false));

    console.log('Date: ', interval.next().toString()); // Fri Nov 25 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)
    console.log('Date: ', interval.next().toString()); // Sun Nov 27 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)

    console.log('Date: ', interval.prev().toString()); // Fri Nov 25 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)
    console.log('Date: ', interval.prev().toString()); // Wed Nov 23 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)
} catch (err) {
    console.log('Error: ' + err.message);
}