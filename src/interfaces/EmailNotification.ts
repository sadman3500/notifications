
import { BaseNotification } from './Notification';

export interface EmailNotification extends BaseNotification {
  recipient: string;  // Email address of the recipient
  subject: string;    // Subject of the email
}
