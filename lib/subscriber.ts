import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    listen(queueName: string, optionsCallback: any) {
        var self = this;
        self.channel.assertExchange(queueName, 'fanout', { durable: true });
        self.channel.assertQueue("", { exclusive: false }, function (err, q) {
            console.log('Waiting for messages in %s.', q.queue);
            self.channel.bindQueue(q.queue, queueName, '');
            return self.channel.consume(q.queue, function (msg) {
                if (msg !== null) {
                    try {
                        optionsCallback(msg);
                    } catch (ex) {
                        optionsCallback(ex)
                    }
                }
            });
        });
    }
}