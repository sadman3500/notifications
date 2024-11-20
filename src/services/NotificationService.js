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
exports.NotificationService = void 0;
// src/services/NotificationService.ts
const NotificationTypes_1 = require("../constants/NotificationTypes");
const EmailHandler_1 = require("./handlers/EmailHandler");
const SmsHandler_1 = require("./handlers/SmsHandler");
const InAppHandler_1 = require("./handlers/InAppHandler");
class NotificationService {
    constructor() {
        this.handlers = {
            [NotificationTypes_1.NotificationTypes.EMAIL]: new EmailHandler_1.EmailHandler(),
            [NotificationTypes_1.NotificationTypes.SMS]: new SmsHandler_1.SmsHandler(),
            [NotificationTypes_1.NotificationTypes.IN_APP]: new InAppHandler_1.InAppHandler(),
        };
    }
    notify(notification, types) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifications = Array.isArray(types) ? types : [types];
            yield Promise.all(notifications.map((type) => __awaiter(this, void 0, void 0, function* () {
                const handler = this.handlers[type];
                if (handler) {
                    yield handler.send(notification);
                }
                else {
                    console.warn(`No handler found for notification type: ${type}`);
                }
            })));
        });
    }
}
exports.NotificationService = NotificationService;
