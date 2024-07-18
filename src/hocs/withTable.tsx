import React from "react";
import {I_TableStructure} from "@/interfaces";

interface WithTableProps extends I_TableStructure {
    reverseRows?: boolean,
    reverseCells?: boolean
}

const getCellData = (row: number, col: number, cellData: number[][] | undefined): any | undefined => {
    if (!cellData) return;
    try {
        const data = cellData[row][col];
        return data;
    } catch (e) {
        console.table(cellData)
        throw new Error(`Could not build table: row: ${row}, col: ${col}`);
    }

}

//todo:maybe better naming, we are making cells only
function withTable<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    tableProps: WithTableProps,
    prefix?: string,
    cellData?: undefined | any[][]
): React.FC<P> {
    const {
        rows: tableRows,
        cols: tableCols,
        reverseRows,
        reverseCells
    } = tableProps;

    return (props: { [key: string]: any }) => {
        const renderTableBody = () => {
            let rowsArray = [];
            for (let row = 0; row < tableRows; row++) {
                let cellsArray = [];

                for (let col = 0; col < tableCols; col++) {
                    const key = `${prefix || ""}|row:${row}|col:${col}`;
                    const data = getCellData(row, col, cellData);
                    cellsArray.push(
                        <WrappedComponent  {...props as P}
                                           data={data} prefix={prefix}
                                           col={col} row={row}
                                           key={key}/>
                    )
                }

                if (reverseCells) {
                    cellsArray.reverse();
                }

                rowsArray.push(
                    <tr key={`row-${row}`}>{cellsArray}</tr>
                )
            }
            if (reverseRows) {
                rowsArray.reverse();
            }

            return rowsArray;
        }

        return renderTableBody();
    }
}

export default withTable;
