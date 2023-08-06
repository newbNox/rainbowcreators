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

    const limit = 12; // Number of streams per page
    let cursor = null; // Initialize the cursor to null
    let fetchedStreams = 0; // Number of streams fetched so far
    const fetchedCursors = []

    // Array to store all fetched streams
    let allStreams = [];

    // Fetch streams with pagination until we reach the desired limit
    while (fetchedStreams < limit) {
      if (cursor && fetchedCursors.includes(cursor)) {
        // Skip fetching this cursor again
        break;
      }
      let twitchUrl = `https://api.twitch.tv/helix/streams?first=${limit - fetchedStreams}&language=en`;
      if (cursor) {
        twitchUrl += `&after=${cursor}`;
      }

      const twitchResponse = await fetch(twitchUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Client-ID': TWITCH_CLIENT_ID,
        },
      });

      const twitchJson = await twitchResponse.json();

      // Check if the response contains any streams
      if (twitchJson.data.length === 0) {
        break; // No more streams to fetch, exit the loop
      }

      // Filter the fetched streams to include only streams with the desired tag
      const streamsWithTag = twitchJson.data.filter(stream => {
        return Array.isArray(stream.tags) && stream.tags.includes(tag);
      });

      // Add the filtered streams to the 'allStreams' array
      allStreams = allStreams.concat(streamsWithTag);

      // Update the fetchedStreams count
      fetchedStreams += streamsWithTag.length;

      if (cursor) {
        fetchedCursors.push(cursor);
      }
      // Update the cursor to fetch the next page
      cursor = twitchJson.pagination.cursor;
      console.log(fetchedCursors)
      console.log(allStreams.length)
    }
                                                
    const finalStreams = allStreams.slice(0, limit);
    //console.log(streams);

    res.status(200).json(finalStreams);
  } catch (error) {
    console.error('Error fetching Twitch data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}