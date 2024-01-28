import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/index.css';
import App from 'src/App';
import reportWebVitals from './reportWebVitals';
import { TimeProvider } from './contexts/TimeContext';
import { UserProvider } from './contexts/UserContext';
import { dynamicGtag, injectGtagScript } from './logEvents';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement || document.createElement('root'),
);

injectGtagScript();
dynamicGtag('js', new Date());
dynamicGtag('config', process.env.REACT_APP_GA_TRACKING_ID);

root.render(
  <React.StrictMode>
    <UserProvider>
      <TimeProvider>
        <App />
      </TimeProvider>
    </UserProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
