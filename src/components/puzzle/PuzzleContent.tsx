import {useImmerReducer} from "use-immer";
import {I_Puzzle} from "@/interfaces";
import {CellFill, CellMap} from "@/types";
import FillSelection from "./FillSelection";
import FillSwatch from "./FillSwatch";
import PuzzleLegend from "./PuzzleLegend";
import PuzzleBody from "./PuzzleBody";
import PuzzleTools from "./PuzzleTools";
import PuzzleModal from "./PuzzleModal";

interface PuzzleState {
    fill: CellFill,
    cellSize: number,
    cellMap: CellMap,
    showResetModal: boolean
}

const DEFAULT_SIZE = 12;

type GeneralActions = {
    type: "puzzle/set-cell-size"
        | "puzzle/reset"
        | "puzzle/increase-size"
        | "puzzle/reset-size"
        | "puzzle/decrease-size"
};

type FillAction = {
    type: "puzzle/set-fill",
    payload: CellFill
};

type CellMapAction = {
    type: "puzzle/set-cell-map",
    payload: CellMap
};

type ResetModalAction = {
    type: "puzzle/reset-modal-show",
    payload: boolean
};

type Action = GeneralActions | FillAction | CellMapAction | ResetModalAction;

const puzzleReducer = (state: PuzzleState, action: Action): PuzzleState => {
    switch (action.type) {
        case "puzzle/reset":
            state.showResetModal = false;
            state.cellMap = [];
            return state;

        //Change cell size
        case "puzzle/increase-size":
            state.cellSize++;
            return state;
        case "puzzle/decrease-size":
            state.cellSize--;
            return state;
        case "puzzle/reset-size":
            state.cellSize = DEFAULT_SIZE;
            return state;

        //Change cell fill
        case "puzzle/set-fill":
            state.fill = action.payload;
            return state;

        case "puzzle/set-cell-map":
            state.cellMap = action.payload;
            return state;

        case "puzzle/reset-modal-show":
            state.showResetModal = action.payload;
            return state;
        default:
            return state
    }
}

interface PuzzleContentProps {
    puzzle: I_Puzzle
}

const PuzzleContent = ({puzzle}: PuzzleContentProps) => {

    const initialState = {
        fill: puzzle.colors[0],
        cellSize: DEFAULT_SIZE,
        cellMap: [],
        showResetModal: false
    };

    const [{
        cellSize,
        cellMap,
        fill,
        showResetModal
    }, dispatch] = useImmerReducer<PuzzleState, Action>(
        puzzleReducer,
        initialState
    );

    //todo:get CellMap from saved solution
    // const {id} = puzzle;
    // get User ID for retrieving solutions
    // const {solution, isLoading} = useUserSolution(id, "user_1");
    // useEffect(() => {
    //         if (solution) {
    //             dispatch({type: actions.setCellMap, payload: solution});
    //         }
    //     },
    //     [solution]);


    const toolsHandlers = {
        onIncrease: () => {
            dispatch({type: "puzzle/increase-size"});
        },
        onDecrease: () => {
            if (cellSize < 10) return;
            dispatch({type: "puzzle/decrease-size"});
        },
        onReset: () => {
            dispatch({type: "puzzle/reset-modal-show", payload: true});
        }
    };

    const modalHandlers = {
        onReset: () => dispatch({type: "puzzle/reset"}),
        onCancel: () => dispatch({type: "puzzle/reset-modal-show", payload: false}),
        onClose: () => dispatch({type: "puzzle/reset-modal-show", payload: false})
    }

    return (
        <div className="puzzle">
            <FillSelection selectedFill={fill}
                           colors={puzzle.colors}
                           setFill={(fill: CellFill) => dispatch({type: "puzzle/set-fill", payload: fill})}/>

            <table align="center" className="table-fixed" cellPadding={0}>
                <thead>
                <tr>
                    <th className=" relative">
                        <FillSwatch selectedFill={fill}/>
                    </th>
                    <th>
                        <PuzzleLegend puzzle={puzzle} type="horizontal" cellSize={cellSize}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <PuzzleLegend puzzle={puzzle} type="vertical" cellSize={cellSize}/>
                    </td>
                    <td>
                        <PuzzleBody puzzle={puzzle}
                                    cellSize={cellSize}
                                    cellFill={fill}
                                    cellMap={cellMap}
                                    updateCellMap={(map: CellMap) => dispatch({
                                        type: "puzzle/set-cell-map",
                                        payload: map
                                    })}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="mb-4"/>
            <PuzzleTools {...toolsHandlers}/>
            {showResetModal && <PuzzleModal {...modalHandlers}/>}
        </div>
    );
};

export default PuzzleContent;
