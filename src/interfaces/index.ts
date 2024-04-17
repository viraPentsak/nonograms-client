import {Color} from "../types/index";

interface I_HasId{
    id: string,
}

export interface I_PuzzleLegend {
    size: { width: number, height: number },
    legend: {
        horizontal: number[][],
        vertical: number[][]
    }
}

export interface I_Puzzle extends I_PuzzleLegend, I_HasId {
    colors: Color[]
}