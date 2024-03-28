import React from "react";

interface WithTableProps {
    rows: number,
    cols: number
}
//todo:maybe better naming, we are making cells only
function withTable(WrappedComponent: React.ComponentType<any>,  tableProps: WithTableProps) {
    const {rows, cols} = tableProps;

    return (props: { [key: string]: any }) => {
        const renderTableBody = () => {
            let tds = [];
            for (let row = 0; row < rows; row++) {
                let rows = [];
                for (let col = 0; col < cols; col++) {
                    const cellId = `row:${row}|col:${col}`;
                    rows.push(
                        <WrappedComponent  {...props} key={cellId} cellId={cellId}/>
                    )
                }

                tds.push(
                    <tr key={`row-${row}`}>{rows}</tr>
                )
            }
            return tds;
        }

        return renderTableBody();
    }
}

export default withTable;