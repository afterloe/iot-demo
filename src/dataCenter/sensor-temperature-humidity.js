/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

module.exports = (deveui, payload, port) => {
    console.log(deveui, payload, port);
    const [data_buf, _] = [Buffer.from(payload, "base64"), {}];
    console.log(data_buf);

    const [head_buf, battery_buf, rssi_buf, temp_int_buf, temp_fra_buf, humidity_buf, angle_buf] = data_buf;

    if (!(head_buf & 0x20) || 8 !== data_buf.length) {
        console.log(`[${new Date()}][INFO][dataCenter][sensor-temperature-humidity]: DATA TYPE ERROR ${JSON.stringify({deveui, payload, port})}`);
        return {};
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
        sensor: {
            type: "温湿度传感器",
            name: "Temperature and Humidity LoRaWAN Sensor",
            deveui
        },
        temperature: {
            flag: (temp_fra_buf & 0x80)? "零下":"零上",
            data: temp_int_buf + "." + temp_fra_buf,
            util: "℃"
        },
        humidity: {
            data: humidity_buf,
            util: "%"
        }
    });

    return _;
};