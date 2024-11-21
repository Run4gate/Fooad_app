import React from "react";
import ReactDOM from "react-dom/client";
import { CartContextProvider } from "./context/cart-context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </React.StrictMode>
);
