import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";

import { GeneralProvider } from "./context/GeneralContext";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <BrowserRouter>

            <GeneralProvider>

                <App />

                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    theme="colored"
                />

            </GeneralProvider>

        </BrowserRouter>

    </React.StrictMode>
);