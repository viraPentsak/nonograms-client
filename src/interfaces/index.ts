import {Color} from "../types/index";

export interface I_PuzzleLegend {
    size: { width: number, height: number },
    legend: {
        horizontal: number[][],
        vertical: number[][]
    }
}

export interface I_Puzzle extends I_PuzzleLegend {
    id: string,
    colors: Color[]
}