import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    public async listen(queueName: string) {
        return new Promise((resolve, reject) => {
            try {
                var self = this;
                this.channel.assertQueue(queueName, { durable: true });
                this.channel.consume(queueName, function (data) {
                    if (data) {
                        self.channel.ack(data);
                        resolve(JSON.parse(data.content.toString()));
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}