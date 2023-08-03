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
      <h1 className='headline'>LGBTQIA STREAMERS LIVE RIGHT NOW!</h1>
      <div className="container">
        <div class="row">
        {streams ? streams.map((stream) => (
          <div className="col-lg-4 d-flex align-items-stretch">
              <div className="card">
                <div className='card-header'><b>{stream.user_name}</b></div>
                <div className='card-img-caption'>
                  <p className='card-text'>{stream.viewer_count}</p>
                  <img src={stream.thumbnail_url.replace("-{width}x{height}", "")} className="card-img-top" alt="..." />
                </div>
                <div className="card-body text-start">
                  <p className="card-text">{stream.title.substring(0, 75) + "..."}</p>
                </div>
                <a href={`https://twitch.tv/${stream.user_name}`} target='_blank' className="btn btn-dark justify-self-end mt-auto">Watch the live</a>
                <div class="card-footer text-body-secondary">
                  {stream.game_name}
                </div>
              </div>
          </div>
        )) : <p>Currently none</p>
        }
        </div>
      </div>
    </div >
  );
};

export default TwitchLiveStreams;