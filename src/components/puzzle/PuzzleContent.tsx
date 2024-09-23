import {useImmerReducer} from "use-immer";
import {I_Puzzle} from "@/interfaces";
import {CellCoords, CellFill, CellMap, LegendType} from "@/types";
import FillSelection from "./FillSelection";
import FillSwatch from "./FillSwatch";
import PuzzleLegend from "./PuzzleLegend";
import PuzzleBody from "./PuzzleBody";
import PuzzleTools from "./PuzzleTools";
import PuzzleModal from "./PuzzleModal";
import {useEffect} from "react";
interface PuzzleState {
    fill: CellFill;
    cellSize: number;
    cellMap: CellMap;
    showResetModal: boolean;
    legendHorizontal: CellMap;
    legendVertical: CellMap;
}

const DEFAULT_SIZE = 12;

type GeneralActions = {
    type: "puzzle/set-cell-size"

        | "puzzle/increase-size"
        | "puzzle/reset-size"
        | "puzzle/decrease-size"
};

type ResetAction = {
    type: "puzzle/reset";
    payload: PuzzleState
}

type FillAction = {
    type: "puzzle/set-fill";
    payload: CellFill;
};

type CellMapAction = {
    type: "puzzle/set-cell-map";
    payload: CellMap;
};

type ResetModalAction = {
    type: "puzzle/reset-modal-show";
    payload: boolean;
};

type LegendAction = {
    type: "legend/set-cell-map";
    payload: { coords: CellCoords, fill: CellFill, type: LegendType };
}

type Action = GeneralActions | ResetAction | FillAction | CellMapAction | ResetModalAction | LegendAction;

const legendCellHandler = (action: LegendAction, state: PuzzleState): PuzzleState => {
    const {coords, type, fill} = action.payload;

    const legend = type === "horizontal"
        ? state.legendHorizontal
        : state.legendVertical;

    legend[coords.row][coords.col] = fill;

    return state;
}

const puzzleReducer = (state: PuzzleState, action: Action): PuzzleState => {

    switch (action.type) {
        case "puzzle/reset":
            state = action.payload;
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

        case "legend/set-cell-map":
            return legendCellHandler(action, state);


        default:
            return state
    }
}

interface PuzzleContentProps {
    puzzle: I_Puzzle
}

const getBaseCellMap = (rows: number, cols: number): CellMap => {
    return Array(rows).fill(Array(cols).fill(undefined));
}

//TODO: get legends from user's data
const getInitialState = (puzzle: I_Puzzle): PuzzleState => {
    const legendSizeHorizontal = puzzle.legendSize["horizontal"];
    const legendSizeVertical = puzzle.legendSize["vertical"];
    return {
        fill: puzzle.colors[0],
        cellSize: DEFAULT_SIZE,
        cellMap: [],
        showResetModal: false,
        legendHorizontal: getBaseCellMap(legendSizeHorizontal.rows, legendSizeHorizontal.cols),
        legendVertical: getBaseCellMap(legendSizeVertical.rows, legendSizeVertical.cols),
    }
}

const PuzzleContent = ({puzzle}: PuzzleContentProps) => {

    const initialState = getInitialState(puzzle);

    const [{
        cellSize,
        cellMap,
        fill,
        showResetModal,
        legendHorizontal,
        legendVertical
    }, dispatch] = useImmerReducer<PuzzleState, Action>(
        puzzleReducer,
        initialState
    );

    useEffect(() => {
        //Reset fill to initial when switching puzzle
        dispatch({
            type: "puzzle/reset",
            payload: initialState
        })
    }, [puzzle.id])

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
        onReset: () => dispatch({type: "puzzle/reset", payload: initialState}),
        onCancel: () => dispatch({type: "puzzle/reset-modal-show", payload: false}),
        onClose: () => dispatch({type: "puzzle/reset-modal-show", payload: false})
    };

    const setLegendCellMap = (type: LegendType, coords: CellCoords) => {
        const cellData = puzzle.legend[type][coords.row]?.[coords.col]

        if (!cellData) return;

        const cellValue =
            (type === "horizontal")
                ? legendHorizontal[coords.row]?.[coords.col]
                : legendVertical[coords.row]?.[coords.col];

        //toggle cell fill
        const fill = cellValue
            ? undefined
            : "none";

        dispatch({
            type: `legend/set-cell-map`,
            payload: {
                coords,
                fill,
                type
            }
        })
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
                        <PuzzleLegend puzzle={puzzle}
                                      type="horizontal"
                                      setCellMap={setLegendCellMap}
                                      cellSize={cellSize}
                                      cellMap={legendHorizontal}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <PuzzleLegend puzzle={puzzle}
                                      type="vertical"
                                      cellSize={cellSize}
                                      setCellMap={setLegendCellMap}
                                      cellMap={legendVertical}/>
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