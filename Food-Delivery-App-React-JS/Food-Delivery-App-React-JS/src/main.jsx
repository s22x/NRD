import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.js";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
    </Provider>
  </BrowserRouter>
);
