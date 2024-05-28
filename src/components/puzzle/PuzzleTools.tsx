import React from "react";
import {Button} from "@/components";


interface PuzzleToolsProps {
    onIncrease: React.MouseEventHandler,
    onDecrease: React.MouseEventHandler,
    onReset: React.MouseEventHandler
}

const PuzzleTools:React.FC<PuzzleToolsProps> = (props ) => {
    return (
        <div className="flex flex-row gap-3 justify-center">
            <Button onClick={props.onIncrease}>Increase size</Button>
            <Button onClick={props.onDecrease}>Decrease size</Button>
            <Button onClick={props.onReset} variant="danger" >Reset</Button>
        </div>
    );
};

export default PuzzleTools;
