import React, {FC, CSSProperties} from "react";
import clsx from "clsx";
import {CellMap} from "../../types/index";

export interface PuzzleCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    cellId?: string,
    className?: string,
    cellMap: CellMap,
    eventsMap?: { [key: keyof HTMLElementEventMap]: Function }
}

const PuzzleCell: FC<PuzzleCellProps> = (props: PuzzleCellProps) => {
    const {cellId, cellMap, eventsMap} = props;

    const bgClassName = () => {
        if (cellId && (cellMap[cellId] === "none")) {
            return "bg-cross";
        }
        return ""
    }

    const classNames = clsx(
        props.className,
        "bg-no-repeat bg-center bg-80%",
        bgClassName()
    );

    const style: CSSProperties = {
        backgroundColor: cellId && cellMap[cellId] || "none"
    };

    return (
        <td className={classNames}
            {...eventsMap}
            id={cellId}
            style={style}/>
    );
};

export default PuzzleCell;