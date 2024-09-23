import {useCallback} from "react";
import {NavLink} from "react-router-dom";
import {ReactNode} from "react";
import {clsx} from "clsx";

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

//todo:redo puzzle links into puzzle selection on home page
const links = [
    {url: "/puzzle/id1", text: "Puzzle 1"},
    {url: "/puzzle/id2", text: "Puzzle 2"},
    // {url: "/puzzle/id3", text: "Puzzle 3"},
    {url: "/puzzle/id4", text: "Puzzle 4"},
    {url: "/", text: "Home"},
];

//Todo: maybe no need in menu
const AppHeader = () => {
    const linkClassName = useCallback(({isActive}: { isActive: boolean }): string | undefined => {
        return clsx(defaultClassName, {"hidden": isActive});
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