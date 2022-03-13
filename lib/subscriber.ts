import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    public async listen(queueName: string, optionsCallback: any) {
        var self = this;
        await self.channel.assertExchange(queueName, 'fanout', { durable: true });
        await self.channel.assertQueue("", { exclusive: false }, function (err, q) {
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

        // self.channel.assertQueue(queueName, { durable: true });
        // return self.channel.consume(queueName, (msg) => {
        //     if (msg !== null) {
        //         try {
        //             optionsCallback(msg);
        //         } catch (ex) {
        //             optionsCallback(ex)
        //         }
        //     }
        // });
    }
}