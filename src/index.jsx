import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx"; 
import "./Content.css";
import "./Dashboard.css";
import "./Logo.css";
import "./Reviews.css";

// Render the App inside the root div
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
