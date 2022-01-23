import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    public async listen(queueName: string) {
        try {
            var self = this;
            await this.channel.assertQueue(queueName, { durable: true });
            await this.channel.consume(queueName, function (message) {
                if (message) {
                    self.channel.ack(message);
                    return message.content.toString();
                }
            });
            return null;
        }
        catch (error) {
            return error
        }
    }
}