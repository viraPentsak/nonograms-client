import React, {FC, CSSProperties, useCallback} from "react";
import clsx from "clsx";
import {I_PuzzleCell} from "@/interfaces";

interface PuzzleCellProps extends I_PuzzleCell {
    className?: string,
    data?: any
}

const PuzzleCell: FC<PuzzleCellProps> = (props) => {
    const {cellMap, eventsMap, data, row = 1, col = -1} = props;
    const cellMapValue = cellMap[row] ? cellMap[row][col] : undefined;

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLTableCellElement>) => {
            if (!eventsMap || !("onMouseDown" in eventsMap)) return

            return eventsMap.onMouseDown(row, col, event);
        }, [row, col]);

    const handleMouseUp = useCallback(
        (event: React.MouseEvent<HTMLTableCellElement>) => {
            if (!eventsMap || !("onMouseUp" in eventsMap)) return

            return eventsMap.onMouseUp(row, col, event)
        }, [row, col]);

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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={style}>
            <span className="text-sx">{data}</span>
        </td>
    );
};

export default PuzzleCell;
