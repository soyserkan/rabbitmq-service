"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
class Subscriber {
    constructor(channel) {
        this.channel = channel;
    }
    listen(queueName, optionsCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            yield self.channel.assertExchange(queueName, 'fanout', { durable: false });
            yield self.channel.assertQueue('', { exclusive: true });
            self.channel.bindQueue(queueName, queueName, '');
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");
            return self.channel.consume(queueName, (msg) => {
                if (msg !== null) {
                    try {
                        optionsCallback(msg);
                    }
                    catch (ex) {
                        optionsCallback(ex);
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
        });
    }
    ;
}
exports.Subscriber = Subscriber;
