import ReactDOM from "react-dom/client"
import React from "react";
import {RouterProvider} from "react-router-dom";
import "./index.css"

import router from "./router";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)