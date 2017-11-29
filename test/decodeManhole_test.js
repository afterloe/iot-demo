/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const cmd = {
    deveui: "004A77006E00003C",
    payload: "WgIhAiQBNQ",
    port: 2
};

const {deveui, payload, port} = cmd;
console.log(deveui, payload, port);

// console.log(3600 >> 8);
// console.log(3600 % 256);

// const _ = Buffer.from("0044", "hex");
// console.log((_[0] << 8) + _[1]);
// console.log()


const manhole = require("../src/dataCenter/sensor-manhole");
const obj = manhole(deveui, payload, port);

console.dir(obj);

