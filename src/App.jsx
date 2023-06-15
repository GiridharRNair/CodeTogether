import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortUniqueId from 'short-unique-id';

import CodeEditor from './pages/CodeEditor';

function App() {
  const [roomID, setRoomID] = useState('');
  const uuid = new ShortUniqueId({ length: 6 });

  useEffect(() => {
    const url = window.location.pathname;
    const pathSegments = url.split('/').filter(segment => segment.trim() !== '');

    if (pathSegments.length === 1 && pathSegments[0].length === 6) {
      setRoomID(pathSegments[0]);
    } else {
      const newRoomID = uuid();
      setRoomID(newRoomID);
      const newUrl = `/${newRoomID}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  return (
    <div className='h-screen overflow-y-scroll no-scrollbar'>
      <BrowserRouter>
        <Routes>
          <Route path="/:uuid" element={<CodeEditor key={roomID} roomID={roomID}/>} />
          <Route path="/" element={<CodeEditor key={roomID} roomID={roomID}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
