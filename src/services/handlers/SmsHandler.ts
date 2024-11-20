
type SmsNotification = {
    phoneNumber: string;
    message: string;
  };

export class SmsHandler {
    async send(notification: SmsNotification): Promise<void> {
    }
}