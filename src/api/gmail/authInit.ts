import { google } from 'googleapis';
import readline from 'readline';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path/posix';

dotenv.config();

const ROOT_PATH = process.env.ROOT_PATH;

// Constants
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
];

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

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

      // Save the refresh token directly to the .env file
      updateEnvFile(tokens.refresh_token);
      console.log('Refresh token saved to .env file');
    } catch (error) {
      console.error('Error retrieving the refresh token:', error);
    }
  });
}

// Helper function to update the refresh token in the .env file
function updateEnvFile(refreshToken: string) {
    const ROOT_PATH = process.env.ROOT_PATH || dirname;
  const envPath = path.join(ROOT_PATH, '.env');
  const envVariables = fs.readFileSync(envPath, 'utf8');
  const refreshTokenLine = `REFRESH_TOKEN=${refreshToken}\n`;

  // If the refresh token already exists in the .env file, update it
  if (envVariables.includes('REFRESH_TOKEN=')) {
    const updatedEnv = envVariables.replace(/REFRESH_TOKEN=.*/, refreshTokenLine);
    fs.writeFileSync(envPath, updatedEnv);
  } else {
    // If the refresh token doesn't exist, add it
    fs.appendFileSync(envPath, refreshTokenLine);
  }
}

// Call the function to get the refresh token
getRefreshToken();
