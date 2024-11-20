
import { BaseNotification } from './Notification';

export interface InAppNotification extends BaseNotification {
  userId: string;       // The user ID within the application
  title: string;        // Title of the in-app notification
  link?: string;        // Optional link to more information
}
