import { useState, useEffect, React, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortUniqueId from 'short-unique-id';
import { Analytics } from '@vercel/analytics/react';

const CodeEditor = lazy(() => import('./pages/CodeEditor'));

const uuid = new ShortUniqueId({ length: 6 });

const loadingScreen = 
  <div className="flex items-center justify-center h-screen">
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  </div>


function App() {
  const [roomID, setRoomID] = useState('');

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
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:uuid"
            element={
              <Suspense fallback={loadingScreen}>
                <CodeEditor key={roomID} roomID={roomID} />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={loadingScreen}>
                <CodeEditor key={roomID} roomID={roomID} />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
