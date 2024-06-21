import {createBrowserRouter} from "react-router-dom";
import {HomeRoute, PuzzlesRoute, RootRoute, Route404} from "./routes";
import RootBoundary from "./components/RootBoundary";

const router =  createBrowserRouter([
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

export default router;