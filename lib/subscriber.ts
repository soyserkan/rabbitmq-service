import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    public async listen(queueName: string) {
        var data = null;
        try {
            var self = this;
            await this.channel.assertQueue(queueName, { durable: true });
            await this.channel.consume(queueName, function (message) {
                if (message) {
                    data = JSON.parse(message.content.toString());
                    self.channel.ack(message);
                }
            });
        }
        catch (error) {
            data = error
        }
        return data;
    }
}