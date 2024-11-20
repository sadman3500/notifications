"use strict";
// src/services/NotificationService.ts
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
exports.NotificationService = void 0;
const EmailHandler_1 = require("./handlers/EmailHandler");
const SmsHandler_1 = require("./handlers/SmsHandler");
const InAppHandler_1 = require("./handlers/InAppHandler");
class NotificationService {
    constructor() {
        this.emailHandler = new EmailHandler_1.EmailHandler();
        this.smsHandler = new SmsHandler_1.SmsHandler();
        this.inAppHandler = new InAppHandler_1.InAppHandler();
    }
    notify(notification, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === 'email') {
                yield this.emailHandler.send(notification);
            }
            else if (type === 'sms') {
                yield this.smsHandler.send(notification);
            }
            else if (type === 'inApp') {
                yield this.inAppHandler.send(notification);
            }
            else {
                console.warn(`No handler found for notification type: ${type}`);
            }
        });
    }
}
exports.NotificationService = NotificationService;
