import {useState} from "react";
import FillSelection from "./FillSelection";
import {CellFill, I_Puzzle} from "../../types/index";
import {PuzzleContext} from "../../contexts/index";

export const Puzzle = (props: I_Puzzle) => {
    const [selectedFill, setFill] = useState<CellFill>(props.colors[0]);

    return (
        <PuzzleContext.Provider value={props}>
            <FillSelection selectedFill={selectedFill} setFill={setFill}/>
        </PuzzleContext.Provider>
    );
};