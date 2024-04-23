import ReactDOM from "react-dom/client"
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css"
import {
    Route404,
    HomeRoute,
    PuzzlesRoute,
    RootRoute
} from "./routes";
import RootBoundary from "./components/RootBoundary";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootRoute/>,
        errorElement: <RootBoundary/>,
        children: [
            {
                path: "",
                element: <HomeRoute/>
            },
            {
                path: "puzzle/:id",
                element: <PuzzlesRoute/>
            },
            {
                path: "*",
                element: <Route404/>
            }
        ]
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)