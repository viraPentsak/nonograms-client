import {useState} from "react";
import {CellFill, CellMap} from "../../types/index";
import {Button, Modal} from "./../";
import FillSelection from "./FillSelection";
import FillSwatch from "./FillSwatch";
import PuzzleBody from "./PuzzleBody";
import PuzzleTools from "./PuzzleTools";
import PuzzleLegend from "./PuzzleLegend";

const Puzzle = () => {
    //todo: select first color from array
    const [selectedFill, setFill] = useState<CellFill>("none");
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
                                    setCellMap={setCellMap}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
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