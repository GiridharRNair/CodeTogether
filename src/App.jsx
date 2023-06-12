import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'; // Import UUID generator
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CodeEditor from './pages/CodeEditor';

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
    <BrowserRouter>
      <Routes>
        <Route path="/:uuid" element={<CodeEditor key={roomID} roomID={roomID}/>} />
        <Route path="/" element={<CodeEditor key={roomID} roomID={roomID}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
