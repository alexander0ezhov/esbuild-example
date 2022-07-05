import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// const electron = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer;

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(<App />);
