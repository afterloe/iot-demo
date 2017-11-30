/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const {resolve} = require("path");
const dataCenter = require(resolve("..", "src", "dataCenter"));

// initAnalysisModule, analysis

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

console.log(dataCenter.initAnalysisModule()); // 输出注册模块
let n = 10;
while (n >= 0 ) {
    let number = Math.round(Math.random() * 2);
    dataCenter.analysis(dataList[number]);
    n--;
}