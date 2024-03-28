import {createContext, FC, ReactNode} from "react";
import {I_Puzzle} from "../interfaces/index";
import {items} from "../../mockdata/data.json";

const PuzzleContext = createContext<I_Puzzle | null>(null);

interface PuzzleProviderInterface {
    children: ReactNode
}

const PuzzleProvider:FC<PuzzleProviderInterface> = ({children}:PuzzleProviderInterface) => {
    const puzzle = items[0] as I_Puzzle;

    return (
        <PuzzleContext.Provider value={puzzle}>
            {children}
        </PuzzleContext.Provider>
    );
};

export {PuzzleContext};
export default PuzzleProvider;