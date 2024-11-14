
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./state-manager/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/toaster.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Toaster />
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
