import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import App from "@/app/App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Elemento #root não encontrado no index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
