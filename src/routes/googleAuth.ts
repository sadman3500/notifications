import app, { Router } from "express";

const router = Router();

router.post('/')

route.get("/auth", (req: Request, res: Response) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://mail.google.com/"],
    });
    res.redirect(authUrl);
  });
  
  // Step 2: Handle OAuth2 callback and get the refresh token
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
  
  app.get('/test-notify', async (req: Request, res: Response) => {
    try {
      // Define a plain object for the test notification
      const testNotification = {
        recipient: 'test@example.com',  // Replace with your test email
        subject: 'Test Notification',
        message: 'This is a test notification sent from the test route!',
      };
  
  