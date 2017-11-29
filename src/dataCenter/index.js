/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const {resolve} = require("path");
const [
    sensor_manhole,
    sensor_geomagnetic,
    sensor_tem_hum,
] = [
    require(resolve(__dirname, "sensor-manhole")),
    require(resolve(__dirname, "sensor-geomagnetic")),
    require(resolve(__dirname, "sensor-temperature-humidity"))
];

const analysis = data => {
    const {deveui, payload, port} = data;
    if ("004A77006E00003C" === deveui) {
        const data = sensor_manhole(deveui, payload, port);
        console.log(data);
    } else if ("004A770066002C74" === deveui) {
        const data = sensor_geomagnetic(deveui, payload, port);
        console.log(data);
    } else if ("004A7702110600DD" === deveui) {
        const data = sensor_tem_hum(deveui, payload, port);
        console.log(data);
    } else {
        console.log(`[${new Date()}][INFO][dataCenter]: CAN'T ANALYSIS ${JSON.stringify(data)}`);
    }
};

const initAnalysisModule = () => {

};

const _ = {
    analysis
};

module.exports = _ ;