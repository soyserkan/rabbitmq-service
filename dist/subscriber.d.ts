import amqp from 'amqplib/callback_api';
export declare class Subscriber {
    private channel;
    constructor(channel: amqp.Channel);
    listen(queueName: string): Promise<unknown>;
}
