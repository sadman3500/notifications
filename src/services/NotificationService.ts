// src/services/NotificationService.ts

type EmailNotification = {
  recipient: string;
  subject: string;
  message: string;
};

type SmsNotification = {
  phoneNumber: string;
  message: string;
};

type InAppNotification = {
  userId: string;
  title: string;
  message: string;
  link?: string;
};

// Notification Service


import { NotificationTypes } from '../constants/NotificationTypes';
import { EmailHandler } from './handlers/EmailHandler';
import { SmsHandler } from './handlers/SmsHandler';
import { InAppHandler } from './handlers/InAppHandler';

class NotificationService {
  private emailHandler = new EmailHandler();
  private smsHandler = new SmsHandler();
  private inAppHandler = new InAppHandler();

  async notify(notification: EmailNotification | SmsNotification | InAppNotification, type: string): Promise<void> {
    if (type === 'email') {
      await this.emailHandler.send(notification as EmailNotification);
    } else if (type === 'sms') {
      await this.smsHandler.send(notification as SmsNotification);
    } else if (type === 'inApp') {
      await this.inAppHandler.send(notification as InAppNotification);
    } else {
      console.warn(`No handler found for notification type: ${type}`);
    }
  }
}

export { NotificationService };
