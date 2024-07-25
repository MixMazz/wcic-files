import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserProvider } from 'src/contexts/UserContext.tsx';
import { TimeProvider } from './contexts/TimeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <TimeProvider>
        <App />
      </TimeProvider>
    </UserProvider>
  </React.StrictMode>
);
