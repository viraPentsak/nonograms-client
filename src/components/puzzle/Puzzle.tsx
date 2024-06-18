import {useEffect, useState} from "react";
import {CellFill, CellMap} from "@/types";
import FillSelection from "./FillSelection";
import FillSwatch from "./FillSwatch";
import PuzzleBody from "./PuzzleBody";
import PuzzleTools from "./PuzzleTools";
import PuzzleLegend from "./PuzzleLegend";
import PuzzleModal from "./PuzzleModal";
import {useLocation, useParams} from "react-router-dom";
import {useSlugId} from "../../hooks/useSlugId";
import {useSolution, useUserSolution} from "../../hooks/useSolution";

const Puzzle = () => {

    const [selectedFill, setFill] = useState<CellFill>("none");
    const [cellSize, setCellSize] = useState<number>(12);

    //todo:get CellMap from saved solution
    const [cellMap, setCellMap] = useState<CellMap>([]);

    const [showResetModal, setResetModal] = useState<boolean>(false);

    const id = useSlugId();

    const {solution, isLoading} = useUserSolution()

    useEffect(() => {
        setCellMap([])
    }, [id]);

    useEffect(()=>{
        console.log(solution)
        if(solution){
            setCellMap(solution)
        }
    },[solution]);


    const toolsHandlers = {
        onIncrease: () => {
            setCellSize(cellSize + 1)
        },
        onDecrease: () => {
            if (cellSize < 10) return;
            setCellSize(cellSize - 1);
        },
        onReset: () => {
            setResetModal(true)
        }
    };

    const closeModalHandler = () => setResetModal(false);

    const resetHandler = () => {
        setCellMap([]);
        setResetModal(false)
    };

    return (
        <div className="puzzle">
            <FillSelection selectedFill={selectedFill} setFill={setFill}/>

            <table align="center" className="table-fixed" cellPadding={0}>
                <thead>
                <tr>
                    <th className=" relative">
                        <FillSwatch selectedFill={selectedFill}/>
                    </th>
                    <th>
                        <PuzzleLegend type="horizontal" cellSize={cellSize}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>

                    <td>
                        <PuzzleLegend type="vertical" cellSize={cellSize}/>
                    </td>
                    <td>
                        <PuzzleBody cellSize={cellSize}
                                    cellFill={selectedFill}
                                    cellMap={cellMap}
                                    updateCellMap={setCellMap}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="mb-4"/>
            <PuzzleTools {...toolsHandlers}/>
            {showResetModal && <PuzzleModal onReset={resetHandler}
                                            onCancel={closeModalHandler}
                                            onClose={closeModalHandler}/>}
        </div>
    );
}

export default Puzzle;
