import React, {FC, useEffect, useRef} from "react";
import {I_Puzzle} from "@/interfaces";
import {CellCoords, CellFill, CellMap} from "@/types";
import PuzzleCell, {PuzzleCellProps} from "./PuzzleCell";
import withTable from "@/hocs/withTable";
import {getNumbersRange} from "@/helpers";


const copyCellMap = (array: CellMap): CellMap => {
    return array.map((item) => {
        if (item) {
            return [...item];
        }
    }) as CellMap;
};

interface DragStartRef {
    startRow: number | undefined,
    startCol: number | undefined,
    startElement: EventTarget | null
}

interface I_PuzzleBodyProps {
    cellSize: number,
    cellFill: CellFill,
    cellMap: CellMap,
    updateCellMap: ((map: CellMap) => void),
    puzzle: I_Puzzle
}

const PuzzleBody: FC<I_PuzzleBodyProps> = (props) => {
    const {
        puzzle,
        cellSize,
        cellFill,
        cellMap,
        updateCellMap
    } = props;

    const dragStartLocation = useRef<DragStartRef>({
        startRow: undefined,
        startCol: undefined,
        startElement: null
    });

    const {size}: I_Puzzle = puzzle;
    const {width, height} = size;

    const resetDragStartRef = () => {
        dragStartLocation.current.startRow = undefined;
        dragStartLocation.current.startCol = undefined;
        dragStartLocation.current.startElement = null;
    }

    useEffect(()=>{
        resetDragStartRef();
    }, [puzzle.id])

    const getCellFill = (row: number, col: number, map: CellMap, fill: CellFill): CellFill => {
        const currentFill = fill ? fill : cellFill;

        const mappedFill = map[row] ? map[row][col] : undefined;

        if (currentFill === mappedFill) {
            return undefined;
        }

        return currentFill;
    }

    const getCellsRange = (startRow: number, row: number, startCol: number, col: number): number[][] => {

        //we take bigger number as the cells that matter more
        const rowRange = getNumbersRange(startRow, row);
        const colRange = getNumbersRange(startCol, col);
        const rowDifference = rowRange.length;
        const colDifference = colRange.length;

        if (rowDifference >= colDifference) {
            return [rowRange, [startCol]];
        }
        return [[startRow], colRange];
    };

    const updateMultipleCells = (params: number[][], fill?: CellFill) => {
        const updatedCellMap = copyCellMap(cellMap);
        const [rowRange, colRange] = params;
        const finalFill = getCellFill(rowRange[0], colRange[0], cellMap, fill);

        for (const r of rowRange) {
            if (!updatedCellMap[r]) {
                updatedCellMap[r] = [];
            }

            for (const c of colRange) {
                updatedCellMap[r][c] = finalFill;
            }
        }

        updateCellMap(updatedCellMap);
    }

    const onContextMenuHandler = (evt: React.MouseEvent) => {
        evt.preventDefault();
    };

    const cellEventsMap = {
        onMouseDown: ({currentTarget}: React.MouseEvent, {row, col}: CellCoords) => {

            if (currentTarget instanceof HTMLTableCellElement) {
                Object.assign(dragStartLocation.current, {
                    startRow: row,
                    startCol: col,
                    startElement: currentTarget
                })
                currentTarget.style.opacity = "0.5";
            }
        },

        onMouseUp: (e: React.MouseEvent, {row, col}: CellCoords) => {
            const {startRow, startCol, startElement} = dragStartLocation.current;

            if (
                typeof startRow === "undefined"
                || typeof startCol === "undefined"
                || !(startElement instanceof HTMLTableCellElement)) return;

            const params = getCellsRange(startRow, row, startCol, col);
            let fill: CellFill;

            if (e.button > 0) {
                fill = "none";
            }

            startElement.style.opacity = "1";

            resetDragStartRef();
            updateMultipleCells(params, fill);
        }
    }

    const tableProps = {cols: width, rows: height};
    const TableBody = withTable<PuzzleCellProps>(PuzzleCell, tableProps, puzzle.id);

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