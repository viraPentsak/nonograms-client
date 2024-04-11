import {CSSProperties, FC, MouseEvent, useState} from "react";
import {I_Puzzle} from "../../interfaces/index";
import {usePuzzle} from "../../hooks/usePuzzle";
import PuzzleCell, {PuzzleCellProps} from "./PuzzleCell";
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

    const getCellId = (event: MouseEvent): string => {
        const target = event.target as Element;
        return target.id;
    }

    const setCellMapValue = (id: string, value: CellFill): void => {
        let updatedCellMap = {
            ...cellMap
        };
        updatedCellMap[id] = cellMap[id] === value ? undefined : value;
        setCellMap(updatedCellMap);
    }

    const updateCell = (event: MouseEvent, value: CellFill): void => {
        const id = getCellId(event);
        setCellMapValue(id, value);
    }

    const onContextMenuHandler = (evt: MouseEvent) => {
        evt.preventDefault();
    };

    const cellEventsMap = {
        onClick: (event: MouseEvent) => {
            updateCell(event, cellFill)
        },

        onAuxClick: (event: MouseEvent) => {
            updateCell(event, "none");
        }
    }

    const TableBody = withTable<PuzzleCellProps>(PuzzleCell, {cols: width, rows: height});

    return (
        <table cellPadding={cellSize / 2}
               align="center"
               className="border border-slate-500 text-none table-fixed" style={styles}>
            <tbody onContextMenu={onContextMenuHandler}>
            <TableBody className="border border-slate-500 "
                       cellMap={cellMap}
                       eventsMap={cellEventsMap}/>
            </tbody>
        </table>
    );
};

export default PuzzleBody;