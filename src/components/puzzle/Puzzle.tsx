import {useState} from "react";
import {I_Puzzle} from "../../interfaces/index";
import {CellFill} from "../../types/index";
import {usePuzzle} from "../../hooks/usePuzzle";
import FillSelection from "./FillSelection";


export const Puzzle = () => {
    const puzzle = usePuzzle();
    if (!puzzle) return;
    const {colors}: I_Puzzle = puzzle;
    const [selectedFill, setFill] = useState<CellFill>(colors[0]);

    return (<FillSelection selectedFill={selectedFill} setFill={setFill}/>);
};