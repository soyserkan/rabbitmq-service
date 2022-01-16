import amqp from "amqplib/callback_api";

class RabbitMQ {
    private _channel?: amqp.Channel;

    get channel() {
        if (!this._channel) {
            throw new Error('Cannot access RabbitMQ channel before connecting');
        }

        return this._channel;
    }

    connect(url: string) {
        var self = this;
        return new Promise((resolve, reject) => {
            amqp.connect(url, function (error0, connection) {
                if (error0) {
                    reject(error0);
                }
                if (connection) {
                    connection.createChannel(function (error1, conn_channel) {
                        if (error1) {
                            reject(error1);
                        }
                        self._channel = conn_channel;
                        resolve(conn_channel);
                    });
                }
            });
        })
    }
}
export const rabbitmq = new RabbitMQ();
