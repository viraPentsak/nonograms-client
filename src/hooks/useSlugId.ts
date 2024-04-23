import {useParams} from "react-router-dom";

export const useSlugId = (): string | undefined => {
    const {id} = useParams();
    return id;
}