// src/services/notifications/handlers/EmailHandler.ts
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as fs from 'fs';
import { EmailNotification } from '../../interfaces/EmailNotification';
import { oauthClient } from '../../api/gmailAuthInit';


const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
export class EmailHandler {
  async send(notification: EmailNotification): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: oauthClient.credentials.refresh_token,
        accessToken: accessToken.token || "",
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: notification.recipient,
      subject: notification.subject,
      text: notification.message,
    });
  }
}
