"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
class Publisher {
    constructor(channel) {
        this.channel = channel;
    }
    publish(queueName, data) {
        var self = this;
        return new Promise((resolve, reject) => {
            try {
                if (self.channel) {
                    console.log("new queue published => " + queueName);
                    self.channel.assertExchange(queueName, 'fanout', { durable: true });
                    resolve(self.channel.publish(queueName, '', Buffer.from(JSON.stringify(data))));
                }
                else {
                    reject("channel not defined");
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Publisher = Publisher;
