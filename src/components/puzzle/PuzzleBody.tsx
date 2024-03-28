import {CSSProperties, FC, MouseEvent, useState} from "react";
import {I_Puzzle} from "../../interfaces/index";
import {usePuzzle} from "../../hooks/usePuzzle";
import PuzzleCell from "./PuzzleCell";
import withTable from "../../hocs/withTable";
import {CellFill, CellMap} from "../../types/index";

interface I_PuzzleBodyProps {
    cellSize: number,
    cellFill: CellFill
}

const PuzzleBody: FC<I_PuzzleBodyProps> = (props) => {
    const {cellSize, cellFill} = props;
    const puzzle = usePuzzle();
    if (!puzzle) return;

    //todo:get CellMap from saved solution
    const [cellMap, setCellMap] = useState<CellMap>({});

    const {size}: I_Puzzle = puzzle;
    const {width, height} = size;
    const styles: CSSProperties = {
        width: `${width * cellSize}px`,
        emptyCells: "show"
    }

    const setCellMapValue = (event: MouseEvent, value: CellFill): void => {
        const target = event.target as Element;
        const id = target.id;
        if (!id) return;
        let updatedCellMap = {
            ...cellMap
        };
        updatedCellMap[id] = cellMap[id] === value ? undefined : value;

        setCellMap(updatedCellMap);
    }

    const onClickHandler = (event: MouseEvent) => {
        setCellMapValue(event, cellFill)
    }

    const onAuxClickHandler = (event: MouseEvent) => {
        setCellMapValue(event, "none");
    };

    const onContextMenuHandler = (evt: MouseEvent) => {
        evt.preventDefault();
    }

    const TableBody = withTable(PuzzleCell, {cols: width, rows: height});

    return (
        <table cellPadding={cellSize / 2}
               align="center"
               className="border border-slate-500 text-none table-fixed" style={styles}>
            <tbody onContextMenu={onContextMenuHandler}>
            <TableBody className="border border-slate-500 "
                       cellMap={cellMap}
                       onAuxClick={onAuxClickHandler}
                       onClick={onClickHandler}/>
            </tbody>
        </table>
    );
};

export default PuzzleBody;