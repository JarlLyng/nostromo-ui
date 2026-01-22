import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@jarllyng/ui-tw/base.css';
import '@jarllyng/ui-tw/themes/nostromo.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
