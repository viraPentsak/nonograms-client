import {useState} from "react";
import {I_Puzzle} from "../../interfaces/index";
import {CellFill, CellMap} from "../../types/index";
import {usePuzzle} from "../../hooks/usePuzzle";
import FillSelection from "./FillSelection";
import PuzzleBody from "./PuzzleBody";
import PuzzleTools from "./PuzzleTools";
import {Button, Modal} from "./../";

const Puzzle = () => {
    const puzzle = usePuzzle();
    if (!puzzle) return;
    const {colors}: I_Puzzle = puzzle;
    const [selectedFill, setFill] = useState<CellFill>(colors[0]);
    const [cellSize, setCellSize] = useState<number>(12);

    //todo:get CellMap from saved solution
    const [cellMap, setCellMap] = useState<CellMap>({});

    const [showResetModal, setResetModal] = useState<boolean>(false);

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
        setCellMap({});
        setResetModal(false)
    }

    return (
        <>
            <FillSelection selectedFill={selectedFill} setFill={setFill}/>
            <PuzzleBody cellSize={cellSize}
                        cellFill={selectedFill}
                        cellMap={cellMap}
                        setCellMap={setCellMap}
            />
            <div className="mb-4"/>
            <PuzzleTools {...toolsHandlers}/>
            {showResetModal && (
                <Modal onClose={closeModalHandler}
                       actionBar={(
                           <div className=" pt-4 flex flex-row gap-2 justify-center">
                               <Button onClick={resetHandler} variant="danger">Yes, reset!</Button>
                               <Button onClick={closeModalHandler} variant="secondary">Cancel</Button>
                           </div>)}>
                    <h2 className="text-xl  font-bold  text-center">Are you sure you want to reset the puzzle?</h2>
                </Modal>)}
        </>
    );
}

export default Puzzle;