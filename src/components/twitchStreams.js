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
          const response = await axios.get('../api/twitch'); // Use axios to make the API call
          const data = response.data;
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
      <h1 className='headline'>LGBTQIA STREAMERS/SUPPORTERS LIVE RIGHT NOW!</h1>
      {streams ? streams.map((stream) => (
        <div key={stream.id}>
          <div className="card">
            {stream.thumbnail_url && (
              <img src={stream.thumbnail_url} className="card-img-top" alt="..." />
            )}
            <div className="card-body">
              <p className="card-text">{stream.title} {stream.user_name}</p>
            </div>
          </div>
        </div>
      )) : <p>Currently none</p>
      }
    </div >
  );
};

export default TwitchLiveStreams;