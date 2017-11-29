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
    let _ = {};
    if ("004A77006E00003C" === deveui) {
        Object.assign(_, sensor_manhole(deveui, payload, port), {plugin: "sensor_manhole"});
    } else if ("004A770066002C74" === deveui) {
        Object.assign(_, sensor_geomagnetic(deveui, payload, port), {plugin: "sensor_geomagnetic"});
    } else if ("004A7702110600DD" === deveui) {
        Object.assign(_, sensor_tem_hum(deveui, payload, port), {plugin: "sensor_tem_hum"});
    } else {
        console.error(`[${new Date()}][INFO][dataCenter]: CAN'T ANALYSIS ${JSON.stringify(data)}`);
    }

    if (_._success) {
        console.log(`[${new Date()}][INFO][dataCenter]: ANALYSIS SUCCESS BY USE ${payload} ON ${deveui} => ${JSON.stringify(_)}`);
    }

    return _;
};

const initAnalysisModule = () => {
    return ["sensor_manhole", "sensor_geomagnetic", "sensor_tem_hum"];
};

const _ = {
    analysis, initAnalysisModule
};

module.exports = _ ;