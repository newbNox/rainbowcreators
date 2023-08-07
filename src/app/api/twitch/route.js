export const revalidate = 300;

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

let accessToken;
let tokenExpiration;

async function fetchAccessToken(){
    if (!accessToken || Date.now() > tokenExpiration){
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
        accessToken = tokenJson.access_token;
        tokenExpiration = Date.now() + (tokenJson.expires_in * 1000);
    }

    return accessToken;
}

async function fetchTwitchData() {
  const token = await fetchAccessToken();
  const twitchUrl = `https://api.twitch.tv/helix/search/channels?query=gay&live_only=true`;

  const twitchResponse = await fetch(twitchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-ID': TWITCH_CLIENT_ID,
    },
  });

  const twitchJson = await twitchResponse.json();

  return twitchJson;
}

async function fetchStreamData(userId){
    const token = await fetchAccessToken();
    const streamUrl = `https://api.twitch.tv/helix/streams?user_id=${userId}`;

    const streamResponse = await fetch(streamUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Client-ID': TWITCH_CLIENT_ID
        }
    });

    const streamJson = await streamResponse.json();

    return streamJson;
}

export async function GET(request) { // Use lowercase for the method name
    try {
      const twitchData = await fetchTwitchData();
      const channels = twitchData.data;

      const userIds = channels.map(ch => ch.id);

      const streamDataPromises = userIds.map(userId => fetchStreamData(userId));
      const streamDataArray = await Promise.all(streamDataPromises);

      const combinedData = channels.map((channel, index) => ({
        channel: channel,
        stream: streamDataArray[index].data[0],
      }));

      return new Response(JSON.stringify(combinedData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
      });
    } catch (err){
        console.error('Error fetching Twitch data:', err);

        return new Response(JSON.stringify({ error: 'Internal server error'}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}