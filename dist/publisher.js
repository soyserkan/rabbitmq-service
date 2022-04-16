"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
class Publisher {
    constructor(channel) {
        this.channel = channel;
    }
    publish(queueName, data) {
        return new Promise((resolve, reject) => {
            try {
                //await this.channel.assertQueue(queueName, { durable: true })
                console.log("new queue published => " + queueName);
                //return this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
                this.channel.assertExchange(queueName, 'fanout', { durable: true });
                resolve(this.channel.publish(queueName, '', Buffer.from(JSON.stringify(data))));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Publisher = Publisher;
