import React, {FC, CSSProperties} from "react";
import clsx from "clsx";
import {I_PuzzleCell} from "@/interfaces";
import {CellCoords} from "@/types";

export interface PuzzleCellProps extends I_PuzzleCell {
    className?: string,
    data?: any;
    eventsMap?: { [index: string]: (e: React.MouseEvent<HTMLTableCellElement>, coords: CellCoords) => void }
}

const PuzzleCell: FC<PuzzleCellProps&React.TdHTMLAttributes<HTMLTableCellElement>> = (props) => {
    const {cellMap, eventsMap, data, row = 1, col = -1} = props;
    const cellMapValue = cellMap[row] ? cellMap[row][col] : undefined;
    const eventHandlers: { [i: string]: React.MouseEventHandler<HTMLTableCellElement> } = {};

    if (eventsMap) {
        Object.keys(eventsMap).map((key) => {
            eventHandlers[key] = (e) => eventsMap[key](e, {row, col});
        })
    }

    const classNames = clsx(
        props.className,
        "relative",
        "absolute-centered-cell",
        "bg-no-repeat bg-center bg-80%",
        {["bg-cross"]: (cellMapValue === "none")}
    );

    const style: CSSProperties = {
        backgroundColor: cellMapValue || "none"
    };

    return (
        <td className={classNames}
            {...eventHandlers}
            style={style}>
            <span className="text-sx">{data}</span>
        </td>
    );
};

export default PuzzleCell;