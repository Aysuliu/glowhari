import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './app/services/axiosInterceptor';
import App from './App';
import { SocketProvider } from './app/context/SocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketProvider>
    <App />
    </SocketProvider>
  </React.StrictMode>
);
