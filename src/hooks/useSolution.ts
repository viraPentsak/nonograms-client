import useSWR, {Fetcher, SWRResponse} from "swr";
import axios from "axios";
import {Solution} from "../types";
import paths from "@/paths";
// import {useParams} from "react-router-dom";
import {I_HasId} from "../interfaces";

// const solutionFetcher: Fetcher<Solution> = async (url: string) => {
//     const res = await axios.get<Solution>(url);
//
//     return res.data;
// }

interface useSolutionProps extends Pick<SWRResponse, "error" | "isLoading"> {
    solution: Solution | undefined
}

// export const useSolution = (): useSolutionProps => {
//     const {id} = useParams();
//     const route = paths.solutionURL(id);
//     const {data, error, isLoading} = useSWR(route, solutionFetcher);
//
//     return {
//         error,
//         isLoading,
//         solution: data
//     }
// }

interface UserSolution extends I_HasId {
    solution: Solution
}

const userSolutionFetcher: Fetcher<UserSolution> = async (url: string) => {
    const res = await axios.get<UserSolution>(url);
    return res.data;
}

export const useUserSolution = (puzzleId: string, userId: string): useSolutionProps => {
    //TODO: get real user id
    const route = paths.userSolution(puzzleId, userId)
    const {data: solution, error, isLoading} = useSWR(route, userSolutionFetcher);

    if(solution){
        return {
            error,
            isLoading,
            solution
        }
    }

    return {
        error,
        isLoading,
        solution
    }

}
