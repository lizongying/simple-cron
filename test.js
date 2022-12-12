import {cron, parse} from './index.js';


const testCron = () => {

    // 每分钟
    console.log('每分钟', cron('minute', 1, false));
    console.log('每分钟随机', cron('minute', 1, true));
    console.log('每分钟深随机', cron('minute', 1, true, true));

    // 每2分钟
    console.log('每2分钟', cron('minute', 2, false));
    console.log('每2分钟随机', cron('minute', 2, true));
    console.log('每2分钟深随机', cron('minute', 2, true, true));

    // 每小时
    console.log('每小时', cron('hour', 1, false));
    console.log('每小时随机', cron('hour', 1, true));
    console.log('每小时深随机', cron('hour', 1, true, true));

    // 每2小时
    console.log('每2小时', cron('hour', 2, false));
    console.log('每2小时随机', cron('hour', 2, true));
    console.log('每2小时深随机', cron('hour', 2, true, true));

    // 每天
    console.log('每天', cron('day', 1, false));
    console.log('每天随机', cron('day', 1, true));
    console.log('每天深随机', cron('day', 1, true, true));

    // 每2天
    console.log('每2天', cron('day', 2, false));
    console.log('每2天随机', cron('day', 2, true));
    console.log('每2天深随机', cron('day', 2, true, true));

    // 每个月
    console.log('每个月', cron('month', 1, false));
    console.log('每个月随机', cron('month', 1, true));
    console.log('每个月深随机', cron('month', 1, true, true));

    // 每2个月
    console.log('每2个月', cron('month', 2, false));
    console.log('每2个月随机', cron('month', 2, true));
    console.log('每2个月深随机', cron('month', 2, true, true));

    // 周日
    console.log('周日', cron('week', 1, false));
    console.log('周日随机', cron('week', 1, true));
    console.log('周日深随机', cron('week', 1, true, true));

    // 周一
    console.log('周一', cron('week', 2, false));
    console.log('周一随机', cron('week', 2, true));
    console.log('周一深随机', cron('week', 2, true, true));
};

const testParse = () => {

    // 每分钟
    console.log('每分钟', '* * * * *', parse('* * * * *'));
    console.log('每分钟随机', '* * * * *', parse('* * * * *'));

    // 每2分钟
    console.log('每2分钟', '*/2 * * * *', parse('*/2 * * * *'));
    console.log('每2分钟随机', '*/2 * * * *', parse('*/2 * * * *'));
    console.log('每20分钟深随机', '19,39,59 * * * *', parse('19,39,59 * * * *'));

    // 每小时
    console.log('每小时', '0 * * * *', parse('0 * * * *'));
    console.log('每小时随机', '1 * * * *', parse('1 * * * *'));

    // 每2小时
    console.log('每2小时', '0 */2 * * *', parse('0 */2 * * *'));
    console.log('每2小时', '1 */2 * * *', parse('1 */2 * * *'));
    console.log('每10小时深随机', '1 9,19 * * *', parse('1 9,19 * * *'));

    // 每天
    console.log('每天', '0 0 * * *', parse('0 0 * * *'));
    console.log('每天随机', '1 2 * * *', parse('1 2 * * *'));

    // 每2天
    console.log('每2天', '0 0 */2 * *', parse('0 0 */2 * *'));
    console.log('每2天随机', '1 2 */2 * *', parse('1 2 */2 * *'));
    console.log('每10天深随机', '1 2 9,19,29 * *', parse('1 2 9,19,29 * *'));

    // 每个月
    console.log('每个月', '0 0 1 * *', parse('0 0 1 * *'));
    console.log('每个月随机', '1 2 2 * *', parse('1 2 2 * *'));

    // 每2个月
    console.log('每2个月', '0 0 1 */2 *', parse('0 0 1 */2 *'));
    console.log('每2个月随机', '1 2 2 */2 *', parse('1 2 2 */2 *'));

    // 周日
    console.log('周日', '* * * * 1', parse('* * * * 1'));
    console.log('周日随机', '1 2 * * 1', parse('1 2 * * 1'));

    // 周一
    console.log('周一', '* * * * 2', parse('* * * * 2'));
    console.log('周一随机', '1 2 * * 2', parse('1 2 * * 2'));
};

const testSome = () => {
    console.log('每58分钟', cron('minute', 58, false));
    console.log('每58分钟', cron('minute', 58, true, true));
    console.log('每三天随机', '36 6 3,6,9,12,15,18,21,24,27,30 * *', parse('36 6 3,6,9,12,15,18,21,24,27,30 * *'));
};

testCron();
testParse();
testSome();
