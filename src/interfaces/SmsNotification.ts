
import { BaseNotification } from './Notification';

export interface SmsNotification extends BaseNotification {
  phoneNumber: string;  // Recipient's phone number
}
