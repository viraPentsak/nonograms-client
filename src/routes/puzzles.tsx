import {Error, Loader, Puzzle} from "../components/index";
import {usePuzzleByRoute} from "../hooks/usePuzzle";

const PuzzlesRoute = () => {
    const {isLoading, error} = usePuzzleByRoute();

    if (isLoading) {
        return <Loader/>
    }

    if (error) {
        return <Error error={{message: "Error loading puzzle. Try again later"}}/>
    }

    return <Puzzle/>;
};

export default PuzzlesRoute;
