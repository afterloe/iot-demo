/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const CMD = "updata";
const NEXT_SUCCESSOR = "nextSuccessor";

const _ = _ => {
    const {cmd} = _;

    if (CMD !== cmd) {
        return NEXT_SUCCESSOR;
    }

    const {deveui, payload, port} = _;

    return {
        needAnalysis: true,
        cmd: {deveui: `00${deveui.toUpperCase()}`, payload, port}
    }
};

module.exports = _ ;