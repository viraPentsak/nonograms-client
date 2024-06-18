import useSWR, {Fetcher, SWRResponse} from "swr";
import axios from "axios";
import {I_Puzzle} from "@/interfaces";
import {useSlugId} from "./useSlugId";
import paths from "@/paths";

const puzzleFetcher: Fetcher<I_Puzzle, string> = async (url: string) => {
    const res = await axios.get<I_Puzzle>(url);
    return res.data;
}

interface usePuzzleProps extends Pick<SWRResponse, "error" | "isLoading"> {
    puzzle: I_Puzzle | undefined,
}

export const usePuzzle = (id: string | undefined): usePuzzleProps => {

    const route = paths.puzzleURL(id);
    const {data, error, isLoading} = useSWR(route, puzzleFetcher);

    return {
        error,
        isLoading,
        puzzle: data
    }
}

export const usePuzzleByRoute = () => {
    const id = useSlugId();

    if (!id) {
        throw new Error("Not a puzzle route!");
    }

    return usePuzzle(id);
}
