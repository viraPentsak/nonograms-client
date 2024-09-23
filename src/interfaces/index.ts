import {CellMap, Color, LegendType, LegendField} from "@/types";
import React from "react";

export interface I_HasId {
    id: string,
}

export interface I_TableStructure {
    rows: number,
    cols: number
}

type LegendFields = Record<LegendType, LegendField>
export type LegendSizeFields = Record<LegendType, I_TableStructure>

export interface I_PuzzleLegend {
    size: { width: number, height: number },
    legend: LegendFields,
    legendSize: LegendSizeFields
}

export interface I_Puzzle extends I_PuzzleLegend, I_HasId {
    colors: Color[]
}

export interface I_PuzzleCell extends React.TdHTMLAttributes<HTMLTableCellElement> {
    row?: number,
    col?: number,
    prefix?: string,
    cellMap: CellMap,
    eventsMap?: {
        [key: string]: (...args: any[]) => void
    }
}