import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx"; // Make sure App.jsx exists

// Render the App inside the root div
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
