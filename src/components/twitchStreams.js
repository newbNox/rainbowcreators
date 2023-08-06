'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';

const formatViewerCount = (count) => {
  if(count < 1000){
    return count;
  } else {
    const countInK = (count / 1000).toFixed(1);
    return `${countInK}K`;
  }
}

const truncateTitle = (str) => {
  if(str.length > 75){
    return str.substring(0, 75) + "...";
  } else {
    return str
  }
}

const TwitchLiveStreams = async ({ tag }) => {

  const response = await fetch(`../api/twitch`);
  const data = await response.json();
  const streams = data.data;
   return (
    <div>
      <h1 className='headline text-center'>LGBTQIA STREAMERS LIVE RIGHT NOW!</h1>
      <div className="container">
        <div className="row">
          {streams ? streams.map((stream) => (
            <div className="col-lg-4 d-flex align-items-stretch" key={stream.id}>
              <div className="card">
                <div className='card-header'><b>{stream.user_name}</b></div>
                <div className='card-img-caption'>
                  <p className='card-text'><FontAwesomeIcon icon={faEye} className="me-1" /> {formatViewerCount(stream.viewer_count)}</p>
                  <img src={stream.thumbnail_url.replace("-{width}x{height}", "")} className="card-img-top rounded-0" alt="..." />
                </div>
                <div className="card-body justify-content-between d-flex flex-column">
                  <p className="card-text">{truncateTitle(stream.title)}</p>
                  <div>
                    <a href={`https://twitch.tv/${stream.user_name}`} target='_blank' className="btn btn-dark btn-sm mt-auto">
                      <FontAwesomeIcon icon={faPlay} className="me-2" />
                      Watch the live
                    </a>
                  </div>
                </div>
                <div className="card-footer text-body-secondary">
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