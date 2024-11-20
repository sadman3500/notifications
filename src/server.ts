import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import { OAuth2Client, Credentials } from "google-auth-library";

const app = express();
const PORT = 3000;

// OAuth2 configuration
const CLIENT_ID = "27728206136-jq0ejukchrmcen632obui2ls6mdffl43.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.get("/auth", (req: Request, res: Response) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://mail.google.com/"],
  });
  res.redirect(authUrl);
});

app.get("/auth/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (code) {
    try {
      const tokenResponse = await oAuth2Client.getToken(code);
      const tokens = tokenResponse?.tokens;

      // Ensure tokens are defined before setting credentials
      if (tokens) {
        oAuth2Client.setCredentials(tokens);
        res.send("Authentication successful! You can now send emails.");
      } else {
        throw new Error("Failed to retrieve tokens.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).send("Error during authentication");
    }
  } else {
    res.status(400).send("Authorization code not found");
  }
});

// Nodemailer function for sending email
async function sendMail(): Promise<any> {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    if (!accessToken || !oAuth2Client.credentials.refresh_token) {
      throw new Error("Failed to retrieve access or refresh token");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "", //From email address
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: oAuth2Client.credentials.refresh_token,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "", //From email address
      to: "", //To email address
      subject: "Hello from Gmail OAuth",
      text: "This email is sent using Gmail OAuth and Nodemailer",
      html: "<h1>This email is sent using Gmail OAuth and Nodemailer</h1>",
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

app.get("/send-email", async (req: Request, res: Response) => {
  try {
    const result = await sendMail();
    res.status(200).send("Email sent: " + result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
