import useSWR, {Fetcher} from "swr";
import axios from "axios";
import {PUZZLES_URL} from "../constants/index";
import {I_Puzzle} from "../interfaces/index";
import {useSlugId} from "./useSlugId";

const puzzleFetcher: Fetcher<I_Puzzle, string> = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
}

export const usePuzzle = (id: string | undefined) => {

    const {data, error, isLoading} = useSWR(`${PUZZLES_URL}${id}`, puzzleFetcher);

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