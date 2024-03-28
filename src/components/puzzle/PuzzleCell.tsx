import React, {FC, CSSProperties} from "react";
import clsx from "clsx";
import {CellMap} from "../../types/index";

export interface PuzzleCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    cellId?: string,
    className?: string,
    cellMap: CellMap
}

const PuzzleCell: FC<PuzzleCellProps> = (props: PuzzleCellProps) => {
    const {cellId, cellMap, onClick, onAuxClick} = props;

    const bgClassName = () =>{
        if(cellId && (cellMap[cellId] === "none")){
            return "bg-cross";
        }
        return ""
    }

    const classNames = clsx(
        props.className,
        "bg-center bg-contain",
        bgClassName()
        );

    const style: CSSProperties = {
        backgroundColor: cellId && cellMap[cellId] || "none"
    };

    return (
        <td className={classNames}
            onClick={onClick}
            onAuxClick={onAuxClick}
            id={cellId}
            style={style}/>
    );
};

export default PuzzleCell;