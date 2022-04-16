import amqp from 'amqplib/callback_api';
export declare class Publisher {
    private channel;
    constructor(channel: amqp.Channel);
    publish(queueName: string, data: any): Promise<unknown>;
}
