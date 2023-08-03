'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TwitchLiveStreams = ({ tag }) => {
  const [streams, setStreams] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchLiveStreams = async () => {
        try {
          const response = await fetch('../api/twitch'); // Make API call to server-side route
          const data = await response.json();
          setStreams(data.data);
        } catch (error) {
          console.error('Error fetching Twitch live streams:', error);
        }
      };

      fetchLiveStreams();
    }
  }, [isClient, tag]);

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