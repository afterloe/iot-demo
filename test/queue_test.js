/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const {resolve} = require("path");
const dataCenter = require(resolve(__dirname, "..", "src", "dataCenter"));
const queue = require(resolve(__dirname, "..", "src", "queue"));

const dataList = [{
    deveui: "004A770066002C74",
    payload: "SD8wAQE",
    port: 10
}, {
    deveui: "004A77006E00003C",
    payload: "WgIhAiQBNQ",
    port: 2
}, {
    deveui: "004A7702110600DD",
    payload: "IAGGGko/Sdo",
    port: 25
}];

queue.initialization(
    require(resolve(__dirname, "..", "src", "config", "mq.json")), dataCenter.initAnalysisModule()).then(() => {
    let number = Math.round(Math.random() * 2);
    const data = dataCenter.analysis(dataList[number]);
    queue.upLink(data).then(() => {
        process.exit(0);
    }).catch(err => process.exit(1000)); // 上报数据
}).catch(err => process.exit(1));// 初始化队列

