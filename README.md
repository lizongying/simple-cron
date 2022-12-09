# simple cron generator

简单定时任务语句生成和解析，支持随机

* [simple-cron-generator](https://github.com/lizongying/simple-cron-generator)

## Feature

* 根据几分钟/几小时... 生成crontab格式: 每2个月深随机 -> 15 20 6 1,3,5,7,9,11 *
* 解析crontab，判断是几分钟/几小时...执行: 1 9,19 * * * -> 每10小时深随机
* 深随机的意思是执行时间更加平均: */10 -> 9,19

## Usage

```shell
npm run test
```

* [example](./index.html)

## Note

* 周是周几，不是每几周
* 当生成每月一次定时任务的时候，天的范围为1-28
* 不支持解析时间间隔不一致的情况
* 不支持解析"-"范围格式
* 不支持解析星期","格式
* 不建议周期超过上层周期的一半进行深随机。如50分钟执行一次， 深随机可能是40 * * * * ，就会每小时执行。