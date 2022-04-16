import amqp from 'amqplib/callback_api';

export class Publisher {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    publish(queueName: string, data: any) {
        var self = this;
        return new Promise((resolve, reject) => {
            try {
                if (self.channel) {
                    console.log("new queue published => " + queueName);
                    self.channel.assertExchange(queueName, 'fanout', { durable: true });
                    resolve(self.channel.publish(queueName, '', Buffer.from(JSON.stringify(data))));
                } else {
                    reject("channel not defined");
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}