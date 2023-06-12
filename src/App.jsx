import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'; // Import UUID generator

import CodeEditor from './components/CodeEditor';

function App() {
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    const url = window.location.pathname;
    const pathSegments = url.split('/').filter(segment => segment.trim() !== '');

    if (pathSegments.length === 1 && pathSegments[0].length === 36) {
      setRoomID(pathSegments[0]);
    } else {
      const newRoomID = uuid();
      setRoomID(newRoomID);
      const newUrl = `/${newRoomID}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  return (
    <CodeEditor key={roomID} roomID={roomID} />
  );
}

export default App;
