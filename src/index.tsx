import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import GlobalGraphContextProvider from "./contexts/GlobalGraphContextProvider";
import VisGraphContextProvider from "./contexts/VisGraphContextProvider";
import DistanceMatrixContextProvider from "./contexts/DistanceMatricContextProvider";
import ParentListContextProvider from "./contexts/ParentListContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <GlobalGraphContextProvider>
      <VisGraphContextProvider>
        <DistanceMatrixContextProvider>
          <ParentListContextProvider>
            <App />
          </ParentListContextProvider>
        </DistanceMatrixContextProvider>
      </VisGraphContextProvider>
    </GlobalGraphContextProvider>
  </React.StrictMode>
);
