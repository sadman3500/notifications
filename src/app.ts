
import express, { Request, Response, NextFunction } from 'express';
import eventEmitter from './events/eventEmitter';
import { initializeEventListeners } from './events';
// import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.set('root', path.resolve(__dirname, '..'));

initializeEventListeners()



eventEmitter.emit('init', app);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, Express with TypeScript!');
});

// Set up OAuth2 client

app.get('/test-notify', async (req: Request, res: Response) => {
  try {
    // Define a plain object for the test notification
    const user = {
      email: 'test@example.com',  // Replace with your test email
      subject: 'Test Notification',
      message: 'This is a test notification sent from the test route!',
    };


    // Trigger an email notification as an example
    await eventEmitter.emit('test', user);

    res.status(200).json({ success: true, message: 'Test notification sent!' });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send test notification' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

