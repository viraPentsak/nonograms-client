import {NavLink} from "react-router-dom";

const Route404 = () => {
    return (
        <div className="h-full flex flex-col justify-center  items-center">
            <h2 className="py-8 text-center">
                <span className="inline-block  pb-2  border-b-2  border-red-400  text-xl  font-bold">
                    Oops! This not the page you are looking for.
                </span>
            </h2>
            <NavLink to="/" className="hover:underline">Take me to the home page, please</NavLink>
        </div>
    );
};

export default Route404;