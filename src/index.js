import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import GlobalGraphContextProvider from "./contexts/GlobalGraphContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalGraphContextProvider>
      <App />
    </GlobalGraphContextProvider>
  </React.StrictMode>
);
