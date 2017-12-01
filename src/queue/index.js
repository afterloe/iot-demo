/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const amqp = require('amqp');

const exchangeConfig = {
    type: 'topic',
    durable: true,
    autoDelete: false,
    confirm: true
};

const queueConfig = {
    durable: true,
    autoDelete: false
};

let queueConnection, queueExchange;

const upLink = data => {
    const {plugin} = data;
    if (!plugin) {
        return Promise.reject();
    }
    console.log(`[${new Date()}][INFO][queue]: SEND ${JSON.stringify(data)} TO ${plugin}`);
    return new Promise((solve, reject) => {
        queueExchange.publish(plugin, data, {confirm: true}, err => {
            if (err) {
                console.error(`[${new Date()}][ERROR][queue]: SEND FAILED BY ${err} -> ${JSON.stringify(data)}`);
                reject(err);
            }

            solve();
        });
    });
};

const createExchange = (exchange = "demo", queueName) => new Promise((solve, reject) => {
    queueConnection.exchange(exchange, exchangeConfig, exchange => {
        queueExchange = exchange;
        queueName.map(name => queueConnection.queue(name, queueConfig, q => q.bind(exchange, name)));
        solve();
    });
});

const initialization = (config, queueName) => new Promise((solve, reject) => {
    const {host, port, login, password, connectionTimeout, authMechanism, vhost, noDelay, ssl, exchange} = config;
    queueConnection = amqp.createConnection({host, port, login, password, connectionTimeout, authMechanism, vhost, noDelay, ssl});

    queueConnection.on("error", err => {
        console.error(`[${new Date()}][ERROR][queue]: CONNECTION FIND ERROR BY ${err}`);
        reject();
    });

    queueConnection.on("ready", () => {
        console.log(`[${new Date()}][INFO][queue]: CONNECTED TO ${host}:${port}`);
        createExchange(exchange, queueName).then(() => solve()).catch(() => reject());
    });
});

const _ = {upLink, initialization};

module.exports = _;