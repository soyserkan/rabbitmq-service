import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    public async listen(queueName: string, optionsCallback: any) {
        var self = this;
        self.channel.assertExchange(queueName, 'fanout', { durable: true });
        self.channel.assertQueue(queueName, { durable: true }, function (err, q) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            self.channel.bindQueue(q.queue, queueName, '');
            return self.channel.consume(q.queue, (msg) => {
                if (msg !== null) {
                    try {
                        optionsCallback(msg);
                    } catch (ex) {
                        optionsCallback(ex)
                    }
                }
            });
        });
    };
}