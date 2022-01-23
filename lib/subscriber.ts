import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    public async listen(queueName: string, optionsCallback: any) {
        var self = this;
        self.channel.assertQueue(queueName, { durable: true });
        return self.channel.consume(queueName, (msg) => {
            if (msg !== null) {
                try {
                    optionsCallback(msg);
                } catch (ex) {
                    optionsCallback(ex)
                }
            }
        });
    };
}