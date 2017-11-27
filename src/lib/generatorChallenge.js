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

const {eui} = require(resolve(__dirname, "..", "config", "index.json"));

const appnonce = 1234;
const challenge= "ABCDEF1234567890ABCDEF1234567890";

module.exports = () => {
  return {appnonce, challenge, appeui: eui};
};