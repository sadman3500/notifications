"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventEmitter_1 = __importDefault(require("./events/eventEmitter"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/', (req, res, next) => {
    res.send('Hello, Express with TypeScript!');
});
// Set up OAuth2 client
const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, // Replace with your client ID
process.env.CLIENT_SECRET, // Replace with your client secret
process.env.REDIRECT_URI // Redirect URI (http://localhost:3000/oauth2callback)
);
// Step 1: Generate the authentication URL
app.get('/auth', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Request offline access to get refresh token
        scope: ['https://www.googleapis.com/auth/gmail.send'], // Gmail API scope
    });
    // Redirect the user to Google's OAuth2 consent screen
    res.redirect(authUrl);
});
// Step 2: Handle OAuth2 callback and get the refresh token
app.get('/oauth2callback', (req, res) => {
    const code = req.query.code;
    // Step 3: Exchange the authorization code for an access token and refresh token
    oAuth2Client.getToken(code, (error, tokens) => {
        if (error) {
            console.log('Error retrieving access token', error);
            return res.status(500).send('Error retrieving access token');
        }
        // Step 4: Store the refresh token for later use
        oAuth2Client.setCredentials(tokens);
        const refreshToken = tokens === null || tokens === void 0 ? void 0 : tokens.refresh_token;
        console.log('Refresh token:', refreshToken);
        // Store the refresh token securely (e.g., in a database or .env file)
        res.send('Authorization successful! You can now send emails.');
    });
});
app.get('/test-notify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define a plain object for the test notification
        const testNotification = {
            recipient: 'test@example.com', // Replace with your test email
            subject: 'Test Notification',
            message: 'This is a test notification sent from the test route!',
        };
        // Trigger an email notification as an example
        yield eventEmitter_1.default.emit('test', testNotification);
        res.status(200).json({ success: true, message: 'Test notification sent!' });
    }
    catch (error) {
        console.error('Error sending test notification:', error);
        res.status(500).json({ success: false, message: 'Failed to send test notification' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
