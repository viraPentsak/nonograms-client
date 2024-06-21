import PuzzleContent from "./PuzzleContent";
import {usePuzzleByRoute} from "@/hooks/usePuzzle";

const Puzzle = () => {
    const {puzzle} = usePuzzleByRoute();

    if(!puzzle) return null;

    return <PuzzleContent puzzle={puzzle}/>
}

export default Puzzle;