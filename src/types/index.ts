type RGB = `rgb(${number},${number},${number})`;
type HEX = `#${string}`;

export type Color = RGB | HEX;
export type CellFill = Color | "none" | undefined;
export type CellMap = CellFill[][] | undefined[][];
export type ButtonType = "primary" | "secondary" | "success" | "warning" | "danger";
export type LegendType = 'vertical' | 'horizontal';