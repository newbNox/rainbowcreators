const https = require('https');

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

export default async function handler(req, res) {
  try {
    const tokenUrl = `https://id.twitch.tv/oauth2/token`;
    const tokenData = new URLSearchParams({
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenData,
    });

    const tokenJson = await tokenResponse.json();
    const accessToken = tokenJson.access_token;

    const tag = req.query.tag; // Assuming you pass the tag as a query parameter

    const twitchUrl = `https://api.twitch.tv/helix/streams?tag_id=${tag}&first=12&language=en&type=live`;
    const twitchResponse = await fetch(twitchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': TWITCH_CLIENT_ID,
      },
    });

    const twitchJson = await twitchResponse.json();

    res.status(200).json(twitchJson);
  } catch (error) {
    console.error('Error fetching Twitch data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}