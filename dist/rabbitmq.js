"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmq = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
class RabbitMQ {
    get channel() {
        if (!this._channel) {
            throw new Error('Cannot access RabbitMQ channel before connecting');
        }
        return this._channel;
    }
    connect(url) {
        var self = this;
        return new Promise((resolve, reject) => {
            callback_api_1.default.connect(url, function (error0, connection) {
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
                    connection.on("error", function (err) {
                        console.log("ERROR", err);
                        if (err.message !== "Connection closing") {
                            console.error("[AMQP] conn error", err.message);
                        }
                    });
                    connection.on("close", function () {
                        console.error("[AMQP] connection closed");
                    });
                }
            });
        });
    }
}
exports.rabbitmq = new RabbitMQ();
