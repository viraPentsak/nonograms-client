import {FC, CSSProperties} from "react";
import clsx from "clsx";
import {I_PuzzleCell} from "../../interfaces";

interface PuzzleCellProps extends I_PuzzleCell{
    className?: string,
}

const PuzzleCell: FC<PuzzleCellProps> = (props) => {
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