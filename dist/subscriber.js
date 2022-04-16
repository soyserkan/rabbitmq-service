"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
class Subscriber {
    constructor(channel) {
        this.channel = channel;
    }
    listen(queueName) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.channel.assertExchange(queueName, 'fanout', { durable: true });
            self.channel.assertQueue("", { exclusive: false }, function (err, q) {
                console.log('Waiting for messages in %s.', q.queue);
                self.channel.bindQueue(q.queue, queueName, '');
                self.channel.consume(q.queue, function (msg) {
                    if (msg !== null) {
                        try {
                            resolve(msg);
                        }
                        catch (ex) {
                            reject(ex);
                        }
                    }
                });
            });
        });
    }
}
exports.Subscriber = Subscriber;
