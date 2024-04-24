import {AppHeader} from "../components/index";
import {Outlet} from "react-router-dom";

const RootRoute = () => {
    return (
        <div className="bg-slate-100">
            <div className="container h-full mx-auto xl ">
                <AppHeader/>
                <Outlet/>
            </div>
        </div>
    );
};
export default RootRoute;