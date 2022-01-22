import amqp from "amqplib/callback_api";
declare class RabbitMQ {
    private _channel?;
    get channel(): amqp.Channel;
    connect(url: string): Promise<unknown>;
}
export declare const rabbitmq: RabbitMQ;
export {};
