import {ReactNode, useCallback} from "react";
import {LegendType, LegendField} from "@/types";
import withTable from "../../hocs/withTable";
import {I_Puzzle, I_PuzzleCell,} from "@/interfaces";
import PuzzleCell from "./PuzzleCell";
import clsx from "clsx";

interface PuzzleLegendProps {
    puzzle: I_Puzzle,
    children?: ReactNode,
    type: LegendType,
    cellSize?: number
}

const PuzzleLegend = ({puzzle, children, type, cellSize}: PuzzleLegendProps) => {
        const legend: number[][] = puzzle.legend[type];
        const legendSize = puzzle.legendSize[type];

        const getLegendData = useCallback((): LegendField => {
            if (type !== "horizontal") return legend

            const rowArray = []
            for (let r = 0; r < legendSize.rows; r++) {
                const newRow = legend.map(item => {
                    return item[r]
                });
                rowArray.push(newRow)
            }
            return rowArray;
            //todo: update if cell map changes
        }, [type, legend, legendSize]);

        const optimizedData = getLegendData();

        const tableProps = {
            ...legendSize,
            reverseCells: true,
            reverseRows: type === "horizontal"
        }

        const TableBody = withTable<I_PuzzleCell>(
            PuzzleCell,
            tableProps,
            `${type}-`,
            optimizedData);

        const className = clsx(
            "border border-slate-300 text-xs text-center",
            {["border-x-slate-500"]: type === "horizontal"},
            {["border-y-slate-500"]: type === "vertical"}
        )

        return (
            <table className="table-fixed bg-slate-200 font-bold" cellPadding={cellSize}>
                <tbody>
                {children}
                <TableBody cellMap={[]}
                           className={className}/>
                </tbody>

            </table>
        );
    }
;

export default PuzzleLegend;