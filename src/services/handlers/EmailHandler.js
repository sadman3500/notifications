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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHandler = void 0;
// src/services/notifications/handlers/EmailHandler.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
class EmailHandler {
    send(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");
            oauth2Client.setCredentials({
                refresh_token: process.env.REFRESH_TOKEN,
            });
            const accessToken = yield oauth2Client.getAccessToken();
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.GMAIL_USER,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken.token || "",
                },
            });
            yield transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: notification.recipient,
                subject: notification.subject,
                text: notification.message,
            });
        });
    }
}
exports.EmailHandler = EmailHandler;
