import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

import { store, persistedStore } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./common/Loading";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
