/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const [pluginType, pluginName] = ["温湿度传感器", "Temperature and Humidity LoRaWAN Sensor"];

module.exports = (deveui, payload, port) => {
    const [data_buf, _] = [Buffer.from(payload, "base64"), {
        _time: new Date().toLocaleString(),
        sensor: {
            type: pluginType,
            name: pluginName,
            deveui
        },
    }];
    console.log(`[${new Date()}][INFO][dataCenter][sensor-temperature-humidity]: RECEIVE BUFFER IS ${data_buf.toString("hex")}`);
    const [head_buf, battery_buf, rssi_buf, temp_int_buf, temp_fra_buf, humidity_buf, angle_buf] = data_buf;

    if (!(head_buf & 0x20) || 8 !== data_buf.length) {
        console.log(`[${new Date()}][INFO][dataCenter][sensor-temperature-humidity]: DATA TYPE ERROR ${JSON.stringify({deveui, payload, port})}`);
        return Object.assign(_, {
            plugin: "unknow_buf",
            payload,
            port
        });
    }

    Object.assign(_, {
        battery: {
            data: battery_buf * 100,
            util: "%"
        },
        RSSI: {
            data: rssi_buf,
            util: "-1dBm"
        },
        _success: true,
        temperature: {
            flag: (temp_int_buf & 0x80)? "零下":"零上",
            data: Number.parseFloat(temp_int_buf + "." + temp_fra_buf),
            util: "℃"
        },
        humidity: {
            data: humidity_buf,
            util: "%"
        }
    });

    return _;
};