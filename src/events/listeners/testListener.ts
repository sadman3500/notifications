// src/events/listeners/userSignupListener.ts
import eventEmitter from '../eventEmitter';
import { NotificationService } from '../../services/NotificationService';

const notificationService = new NotificationService();

export function testListener(): void {
  eventEmitter.on('testing', async (user) => {
    const emailNotification = {
      recipient: user.email,
      subject: 'Welcome!',
      message: 'Thank you for signing up!',
    };

    await notificationService.notify(emailNotification, 'email');
  });
}

