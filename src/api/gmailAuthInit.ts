import { google } from 'googleapis';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Constants
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Google OAuth2 credentials
const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

// Scopes to request
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
];

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Function to initiate the OAuth2 process and get refresh token
async function getRefreshToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the authorization code here: ', async (code) => {
    rl.close();

    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Save the tokens to a file for future use
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log('Refresh token saved to token.json');

      // You can now use the refresh token for future access to Gmail API
      console.log('Refresh token:', tokens.refresh_token);
    } catch (error) {
      console.error('Error retrieving the refresh token:', error);
    }
  });
}

// Call the function to get the refresh token
getRefreshToken();
