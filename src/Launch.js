/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const [
    {resolve},
] = [
    require("path"),
];

const [
    {connection, register, send},
    {receiveMsg, registerModule},
    {analysis},
] = [
    require(resolve(__dirname, "link")),
    require(resolve(__dirname, "msgDisCenter")),
    require(resolve(__dirname, "dataCenter"))
];

const msgDis = data => {
  data = receiveMsg(data);
  try {
      const {needSend, cmd, needAnalysis} = data;
      if (needSend) {
          send(cmd);
      }
      if (needAnalysis) {
          analysis(cmd);
      }
  } catch (exception) {

  }
};

const config = require(resolve(__dirname, "config"));
registerModule(); // 注册 LORA 解析模块

connection(config).then(() => {
    register(msgDis); // 注册收到消息的回调函数
    send({cmd: "join", cmdseq: 1,});
}).catch(err => {
    throw err;
});