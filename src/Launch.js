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
    {upLink, initialization}
] = [
    require(resolve(__dirname, "link")),
    require(resolve(__dirname, "msgDisCenter")),
    require(resolve(__dirname, "dataCenter")),
    require(resolve(__dirname, "queue")),
];

/**
 * 消息处理
 *
 * @param data
 */
const msgDis = data => {
  data = receiveMsg(data); // 消息分拨
  try {
      const {needSend, cmd, needAnalysis} = data; // 回收分拨后的信息进行处理
      if (needSend) {
          send(cmd); // 响应
      }
      if (needAnalysis) {
          data = analysis(cmd); // 插件解析
          upLink(data); // 上报数据
      }
  } catch (exception) {

  }
};

const config = require(resolve(__dirname, "config"));
registerModule(); // 注册 LORA 解析模块
initialization(require(resolve(__dirname, "config", "mq"))); // 初始化队列

connection(config).then(() => {
    register(msgDis); // 注册收到消息的回调函数
    send({cmd: "join", cmdseq: 1,});
}).catch(err => {
    throw err;
});