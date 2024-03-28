import {useContext} from "react";
import {PuzzleContext} from "../contexts/puzzle";

export const usePuzzle = () => useContext(PuzzleContext);