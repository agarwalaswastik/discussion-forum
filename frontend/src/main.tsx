import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

import { store, persistedStore } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { IconContext } from "react-icons";
import { BrowserRouter } from "react-router-dom";

import Loading from "./common/LoadingOverlay";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistedStore}>
        <IconContext.Provider value={{ className: "icons-provider" }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </IconContext.Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
