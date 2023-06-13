import React, { useState } from 'react';

function CopyRoomButton() {
  const [buttonText, setButtonText] = useState('Copy Invite Link');

  const copyUrlToClipboard = () => {
    const appUrl = window.location.href;

    navigator.clipboard.writeText(appUrl)
      .then(() => {
        setButtonText('Copied');
        setTimeout(() => {
          setButtonText('Copy Invite Link');
        }, 1000);
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

  return (
    <button className='w-48 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={copyUrlToClipboard}>
      {buttonText}
    </button>
  );
}

export default CopyRoomButton;
