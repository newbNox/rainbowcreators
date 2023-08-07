const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

async function fetchTwitchData() {
  const tokenUrl = 'https://id.twitch.tv/oauth2/token';
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

  const twitchUrl = `https://api.twitch.tv/helix/search/channels?query=gay&live_only=true`;

  const twitchResponse = await fetch(twitchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Client-ID': TWITCH_CLIENT_ID,
    },
  });

  const twitchJson = await twitchResponse.json();

  return twitchJson;
}

export default async function handler(req, res) {
  try {
    const twitchData = await fetchTwitchData();

    res.status(200).json(twitchData);
  } catch (error) {
    console.error('Error fetching Twitch data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}