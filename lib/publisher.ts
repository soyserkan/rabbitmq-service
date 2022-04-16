import amqp from 'amqplib/callback_api';

export class Publisher {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    publish(queueName: string, data: any) {
        return new Promise((resolve, reject) => {
            try {
                //await this.channel.assertQueue(queueName, { durable: true })
                console.log("new queue published => " + queueName);
                //return this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

                this.channel.assertExchange(queueName, 'fanout', { durable: true });
                resolve(this.channel.publish(queueName, '', Buffer.from(JSON.stringify(data))));
            } catch (error) {
                reject(error);
            }
        })
    }
}