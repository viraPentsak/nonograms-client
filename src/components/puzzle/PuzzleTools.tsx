import {Button} from "./../";

interface PuzzleToolsProps {
    onIncrease: Function,
    onDecrease: Function,
    onReset: Function
}

const PuzzleTools = (props: PuzzleToolsProps) => {
    return (
        <div className="flex flex-row gap-3 justify-center">
            <Button onClick={props.onIncrease}>Increase size</Button>
            <Button onClick={props.onDecrease}>Decrease size</Button>
            <Button onClick={props.onReset} variant="danger" >Reset</Button>
        </div>
    );
};

export default PuzzleTools;