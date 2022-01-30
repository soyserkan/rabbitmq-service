import amqp from 'amqplib/callback_api';

export class Publisher {
    private channel: amqp.Channel;
    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    async publish(queueName: string, data: any) {
        await this.channel.assertExchange(queueName, 'fanout', { durable: true });
        //await this.channel.assertQueue(queueName, { durable: true })
        console.log("new queue published => " + queueName);
        //return this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
        return this.channel.publish(queueName, '', Buffer.from(JSON.stringify(data)));
    }
}