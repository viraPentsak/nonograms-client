import {useCallback} from "react";
import {NavLink} from "react-router-dom";
import {twMerge} from "tailwind-merge";
import classnames from "classnames";
import {ReactNode} from "react";

const defaultClassName = `
relative
py-3 px-6 
after:block 
after:scale-x-0
after:hover:scale-x-100
after:border-b-2 
after:hover:border-slate-500 
after:border-transparent 
after:transition
after:absolute
after:inset-x-0
after:bottom-0`;

const links = [
    {url: "/puzzle/id1", text: "Puzzle"},
    {url: "/", text: "Home"},
];

//Todo: maybe no need in menu
const AppHeader = () => {
    const linkClassName = useCallback(({isActive}: { isActive: boolean }): string | undefined => {
        return twMerge(defaultClassName, classnames({"bg-slate-400 pointer-events-none": isActive}));
    },[]);


    const renderedMenu = links.map((link): ReactNode => {
        return <NavLink to={link.url}
                        className={linkClassName}
                        key={link.text}>{link.text}</NavLink>
    });


    return (
        <div className="container">
            <div className="flex justify-center wrap">
                {renderedMenu}
            </div>
        </div>
    );
};

export default AppHeader;