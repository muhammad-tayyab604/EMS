import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setUser } from "./slices/auth.js";
import store from "./store.js";

const tokenString = localStorage.getItem("token");
if (tokenString) {
  try {
    const { token, user } = JSON.parse(tokenString); // Parse the JSON string
    store.dispatch(setUser(user, token)); // Dispatch setUser action with user and token
  } catch (error) {
    console.error("Error parsing token from localStorage", error);
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
