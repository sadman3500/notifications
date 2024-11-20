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
const nodemailer_1 = __importDefault(require("nodemailer"));
const google_auth_library_1 = require("google-auth-library");
const app = (0, express_1.default)();
const PORT = 3000;
// OAuth2 configuration
const CLIENT_ID = "27728206136-jq0ejukchrmcen632obui2ls6mdffl43.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/callback";
const oAuth2Client = new google_auth_library_1.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
app.get("/auth", (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://mail.google.com/"],
    });
    res.redirect(authUrl);
});
app.get("/auth/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (code) {
        try {
            const tokenResponse = yield oAuth2Client.getToken(code);
            const tokens = tokenResponse === null || tokenResponse === void 0 ? void 0 : tokenResponse.tokens;
            // Ensure tokens are defined before setting credentials
            if (tokens) {
                oAuth2Client.setCredentials(tokens);
                res.send("Authentication successful! You can now send emails.");
            }
            else {
                throw new Error("Failed to retrieve tokens.");
            }
        }
        catch (error) {
            console.error("Error during authentication:", error);
            res.status(500).send("Error during authentication");
        }
    }
    else {
        res.status(400).send("Authorization code not found");
    }
}));
// Nodemailer function for sending email
function sendMail() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessTokenResponse = yield oAuth2Client.getAccessToken();
            const accessToken = accessTokenResponse === null || accessTokenResponse === void 0 ? void 0 : accessTokenResponse.token;
            if (!accessToken || !oAuth2Client.credentials.refresh_token) {
                throw new Error("Failed to retrieve access or refresh token");
            }
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "alam.sadman@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: oAuth2Client.credentials.refresh_token,
                    accessToken: accessToken,
                },
            });
            const mailOptions = {
                from: "alam.sadman@gmail.com",
                to: "alam.sadman369@gmail.com",
                subject: "Hello from Gmail OAuth",
                text: "This email is sent using Gmail OAuth and Nodemailer",
                html: "<h1>This email is sent using Gmail OAuth and Nodemailer</h1>",
            };
            const result = yield transporter.sendMail(mailOptions);
            return result;
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    });
}
app.get("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sendMail();
        res.status(200).send("Email sent: " + result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
