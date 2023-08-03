import React, { useEffect, useState } from 'react';
import { useClient } from 'next/client';
import axios from 'axios';

const TwitchLiveStreams = ({ tag }) => {
  const [streams, setStreams] = useState([]);
  const {TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET} = process.env;
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const tokenUrl = `https://id.twitch.tv/oauth2/token`;
        const tokenData = new URLSearchParams({
          client_id: TWITCH_CLIENT_ID,
          client_secret: TWITCH_CLIENT_SECRET,
          grant_type: 'client_credentials',
        });

        const response = await axios.post(tokenUrl, tokenData);
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching Twitch access token:', error);
      }
    };

    fetchAccessToken();
  }, [TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET]);

  useEffect(() => {
    const getLiveStreams = async () => {
      try {
        if (!accessToken) return; // Wait until the access token is available

        const url = `https://api.twitch.tv/helix/streams?tag_id=${tag}&first=10`;

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-ID': TWITCH_CLIENT_ID,
          },
        });

        console.log('Twitch API Response:', response.data);

        setStreams(response.data.data);
      } catch (error) {
        console.error('Error fetching Twitch live streams:', error);
      }
    };

    getLiveStreams();
  }, [tag, accessToken, TWITCH_CLIENT_ID]);

  return (
    <div>
      <h1>Twitch Live Streams with "{tag}" Tag:</h1>
      {streams.map((stream) => (
        <div key={stream.id}>
          <h2>{stream.title}</h2>
          <p>Streamer: {stream.user_name}</p>
          <p>Viewers: {stream.viewer_count}</p>
          <a
            href={`https://twitch.tv/${stream.user_name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Stream
          </a>
        </div>
      ))}
    </div>
  );
};

export default useClient(TwitchLiveStreams);