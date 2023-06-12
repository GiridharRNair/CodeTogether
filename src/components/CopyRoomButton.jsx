import React from 'react';

function CopyRoomButton() {
  const copyUrlToClipboard = () => {
    const appUrl = window.location.href;

    navigator.clipboard.writeText(appUrl)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

  return (
    <button className='border-black border-2' onClick={copyUrlToClipboard}>Copy URL</button>
  );
}

export default CopyRoomButton;
