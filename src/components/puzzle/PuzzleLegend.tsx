import {ReactNode, useCallback} from "react";
import {usePuzzleByRoute} from "@/hooks/usePuzzle";
import {LegendType} from "@/types";
import withTable from "../../hocs/withTable";
import {I_PuzzleCell} from "@/interfaces";
import PuzzleCell from "./PuzzleCell";
import clsx from "clsx";

interface PuzzleLegendProps {
    children?: ReactNode,
    type: LegendType,
    cellSize?: number
}

const PuzzleLegend = ({children, type, cellSize}: PuzzleLegendProps) => {
        const {puzzle} = usePuzzleByRoute();
        if (!puzzle) return null;
        const legend = puzzle.legend[type];
        const legendSize = puzzle.legendSize[type];

        const optimizeHorizontalData = useCallback(() => {
            let rowArray = []
            for (let r = 0; r < legendSize.rows; r++) {
                let newRow = legend.map(item => {
                    return item[r]
                });
                rowArray.push(newRow)
            }
            return rowArray;
            //todo: update if cell map changes
        }, []);

        const optimizedData = (type === "horizontal") ? optimizeHorizontalData() : legend;

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
            <table className="table-fixed bg-slate-200" cellPadding={cellSize}>
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
