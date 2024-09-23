import {ReactNode} from "react";
import {LegendType, LegendField, CellMap, CellCoords} from "@/types";
import withTable from "../../hocs/withTable";
import {I_Puzzle} from "@/interfaces";
import PuzzleCell, {PuzzleCellProps} from "./PuzzleCell";
import clsx from "clsx";

interface PuzzleLegendProps {
    puzzle: I_Puzzle;
    children?: ReactNode;
    type: LegendType;
    cellSize?: number,
    // todo: cell map
    cellMap: CellMap;
    setCellMap: (type: LegendType, coords: CellCoords) => void;
}

const PuzzleLegend = (
        {
            puzzle,
            children,
            type,
            cellSize,
            cellMap,
            setCellMap
        }: PuzzleLegendProps) => {
        const legend: LegendField = puzzle.legend[type];
        const legendSize = puzzle.legendSize[type];


        const tableProps = {
            ...legendSize,
            reverseRows: type === "horizontal"
        };

        const TableBody = withTable<PuzzleCellProps>(
            PuzzleCell,
            tableProps,
            type,
            legend);

        const className = clsx(
            "border border-slate-300 text-xs text-center",
            "cursor-pointer",
            {["border-x-slate-500"]: type === "horizontal"},
            {["border-y-slate-500"]: type === "vertical"}
        );

        const cellEventsMap = {
            onClick: (_: any, coords: CellCoords) => {
                setCellMap(type, coords);
            }
        };

        return (
            <table className="table-fixed bg-slate-200 font-bold" cellPadding={cellSize}>
                <tbody>
                {children}
                <TableBody cellMap={cellMap}
                           eventsMap={cellEventsMap}
                           className={className}/>
                </tbody>

            </table>
        );
    }
;

export default PuzzleLegend;