import {FC, MouseEvent} from "react";
import {I_Puzzle, I_PuzzleCell} from "../../interfaces/index";
import {usePuzzleByRoute} from "../../hooks/usePuzzle";
import PuzzleCell from "./PuzzleCell";
import withTable from "../../hocs/withTable";
import {CellFill, CellMap} from "../../types/index";

interface I_PuzzleBodyProps {
    cellSize: number,
    cellFill: CellFill,
    cellMap: CellMap,
    setCellMap: Function
}

const PuzzleBody: FC<I_PuzzleBodyProps> = (props) => {
    const {cellSize, cellFill, cellMap, setCellMap} = props;
    const {puzzle} = usePuzzleByRoute();
    if (!puzzle) return;


    const {size}: I_Puzzle = puzzle;
    const {width, height} = size;

    const getCellId = (event: MouseEvent): string => {
        const target = event.currentTarget as Element;
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

    const TableBody = withTable<I_PuzzleCell>(PuzzleCell, {cols: width, rows: height});

    return (
        <table cellPadding={cellSize}
               align="center"
               className="border border-slate-500 table-fixed m-0">
            <tbody onContextMenu={onContextMenuHandler}>
            <TableBody className="border border-slate-500 "
                       cellMap={cellMap}
                       eventsMap={cellEventsMap}/>
            </tbody>
        </table>
    );
};

export default PuzzleBody;