import React from "react";
import clsx from "clsx";
import type {ButtonType} from "../types/index";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonType,
    children?: React.ReactNode,
    className?: string
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        variant = "primary",
        children,
        className,
        ...restProps
    } = props;

    const stylingClassNames = clsx(
        "px-3 py-2 border border-2 transition",
        "border-purple-700 hover:bg-purple-700 hover:bg-purple-800 hover:border-purple-900 hover:text-white",
        {
            "border-slate-700 hover:bg-slate-700 hover:bg-slate-800": variant === "secondary",
            "border-teal-700 hover:bg-teal-700 hover:bg-teal-800": variant === "success",
            "border-rose-700 hover:bg-rose-700 hover:bg-rose-800": variant === "danger",
        },
        className
    );

    return (
        <button className={stylingClassNames} {...restProps}>
            {children}
        </button>
    );
};

export default Button;