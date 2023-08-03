'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { TWITCH_CLIENT_ID } = process.env;

const TwitchLiveStreams = ({ tag }) => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const getLiveStreams = async () => {
      try {
        const url = `https://api.twitch.tv/helix/streams?tag_id=${tag}&first=10`;

        const response = await axios.get(url, {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
          },
        });

        setStreams(response.data.data);
      } catch (error) {
        console.error('Error fetching Twitch live streams:', error);
      }
    };

    getLiveStreams();
  }, [tag]);

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

export default TwitchLiveStreams;