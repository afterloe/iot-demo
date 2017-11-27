/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const {resolve} = require("path");
// const sensor_manhole = require(resolve(__dirname, "sensor-manhole"));

const analysis = data => {
    const {deveui, payload, port} = data;
    console.log(deveui, payload, port);
    if ("004A77006E00003C" === deveui) {

    }
};

const initAnalysisModule = () => {

};

const _ = {
    analysis
};

module.exports = _ ;