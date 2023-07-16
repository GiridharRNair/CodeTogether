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
    <a aria-label="Copy Room URL" className="flex justify-center items-center w-52 mr-1 relative px-5 py-1 overflow-hidden border border-black rounded group" onClick={copyUrlToClipboard}>
      <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
      <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
      <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
      <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
      <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
      <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">{buttonText}</span>
    </a>
  );
}

export default CopyRoomButton;
