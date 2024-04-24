import {FC, CSSProperties} from "react";
import clsx from "clsx";
import {I_PuzzleCell} from "../../interfaces";

interface PuzzleCellProps extends I_PuzzleCell {
    className?: string,
    data?: any
}

const PuzzleCell: FC<PuzzleCellProps> = (props) => {
    const {cellId, cellMap, eventsMap, data} = props;

    const classNames = clsx(
        props.className,
        "relative",
        "absolute-centered-cell",
        "bg-no-repeat bg-center bg-80%",
        {"bg-cross": cellId && (cellMap[cellId] === "none")}
    );

    const style: CSSProperties = {
        backgroundColor: cellId && cellMap[cellId] || "none"
    };

    return (
        <td className={classNames}
            {...eventsMap}
            id={cellId}
            style={style}>
            <span className="text-sx">{data}</span>
        </td>
    );
};

export default PuzzleCell;