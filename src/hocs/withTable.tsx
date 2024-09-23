import React from "react";
import {I_TableStructure} from "@/interfaces";

interface WithTableProps extends I_TableStructure {
    reverseRows?: boolean
}

const getCellData = (row: number, col: number, cellData: number[][] | undefined): number | undefined => {
    if (!cellData) return;
    try {
        const data = cellData[row]?.[col];
        if (!cellData) return
        return data;
    } catch (e) {
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
        // reverseRows
    } = tableProps;

    return (props: P) => {
        const renderTableBody = () => {
            const rowsArray = [];
            for (let row = 0; row < tableRows; row++) {
                const cellsArray = [];
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
                rowsArray.push(
                    <tr key={`row-${row}`}>{cellsArray}</tr>
                )
            }
            // if (reverseRows) {
            //     rowsArray.reverse();
            // }

            return rowsArray;
        }

        return renderTableBody();
    }
}

export default withTable;