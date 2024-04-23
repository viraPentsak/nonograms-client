import React from "react";
import {twMerge} from "tailwind-merge";
import classnames from "classnames";
import type {Button} from "../types/index";

interface ButtonProps {
    variant: Button
}

const Button: React.FC = (props: ButtonProps) => {
    const {
        variant = "primary",
        children,
        className,
        Component = 'button',
        ...restProps
    } = props;

    const stylingClassNames = twMerge(classnames(
        "px-3 py-2 border border-2 transition",
        "border-purple-700 hover:bg-purple-700 hover:bg-purple-800 hover:border-purple-900 hover:text-white",
        {
            "border-slate-700 hover:bg-slate-700 hover:bg-slate-800": variant === "secondary",
            "border-teal-700 hover:bg-teal-700 hover:bg-teal-800": variant === "success",
            "border-rose-700 hover:bg-rose-700 hover:bg-rose-800": variant === "danger",
        },
        className
    ));

    return (
        <Component className={stylingClassNames} {...restProps}>
            {children}
        </Component>
    );
};

export default Button;