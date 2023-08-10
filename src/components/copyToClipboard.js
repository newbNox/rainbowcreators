'use client'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const CopyToClipboardButton = ({ text }) => {

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
  };

  const buttonStyle = {
    '--bs-btn-padding-y': '.25rem',
    '--bs-btn-padding-x': '.5rem',
    '--bs-btn-font-size': '.75rem',
  };

  return (
      <button className='btn btn-dark btn-sm' style={buttonStyle} onClick={handleCopyClick}>
        <FontAwesomeIcon icon={faClipboard}/>
      </button>
  );
};

export default CopyToClipboardButton;
