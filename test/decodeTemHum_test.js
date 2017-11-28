/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const cmd = {
    deveui: "004A770066002C74",
    payload: "SD8wAQE",
    port: 10
};

const {deveui, payload, port} = cmd;

const manhole = require("../src/dataCenter/sensor-temperature-humidity");
const obj = manhole(deveui, payload, port);

console.dir(obj);