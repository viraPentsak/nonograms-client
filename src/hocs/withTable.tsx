import React from "react";
import {I_TableStructure} from "../interfaces/index";

interface WithTableProps extends I_TableStructure{
}

//todo:maybe better naming, we are making cells only
function withTable<P extends object>(
    WrappedComponent: React.ComponentType<P>, tableProps: WithTableProps
): React.FC<P> {
    const {rows, cols} = tableProps;

    return (props: { [key: string]: any }) => {
        const renderTableBody = () => {
            let tds = [];
            for (let row = 0; row < rows; row++) {
                let rows = [];
                for (let col = 0; col < cols; col++) {
                    const cellId = `row:${row}|col:${col}`;
                    rows.push(
                        <WrappedComponent  {...props as P} key={cellId} cellId={cellId}/>
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