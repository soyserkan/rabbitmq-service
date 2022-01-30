import amqp from 'amqplib/callback_api';

export class Subscriber {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    public async listen(queueName: string, optionsCallback: any) {
        var self = this;
        await self.channel.assertExchange(queueName, 'fanout', { durable: false });
        await self.channel.assertQueue('', { exclusive: true })
        self.channel.bindQueue(queueName, queueName, '');
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");
        return self.channel.consume(queueName, (msg) => {
            if (msg !== null) {
                try {
                    optionsCallback(msg);
                } catch (ex) {
                    optionsCallback(ex)
                }
            }
        }, { noAck: true });





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
    };
}