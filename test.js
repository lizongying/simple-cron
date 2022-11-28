const cron = require('./index');

const parser = require('cron-parser');

cron.test();

try {
    const interval = parser.parseExpression(cron.simpleCron(0, 0, 2, 0, 0, false));

    console.log('Date: ', interval.next().toString()); // Fri Nov 25 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)
    console.log('Date: ', interval.next().toString()); // Sun Nov 27 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)

    console.log('Date: ', interval.prev().toString()); // Fri Nov 25 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)
    console.log('Date: ', interval.prev().toString()); // Wed Nov 23 2022 00:00:00 GMT+0800 (Hong Kong Standard Time)
} catch (err) {
    console.log('Error: ' + err.message);
}