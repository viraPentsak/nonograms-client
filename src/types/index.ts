type RGB = `rgb(${number},${number},${number})`;
type HEX = `#${string}`;

export type Color = RGB | HEX;
export type CellFill = Color | "none";

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