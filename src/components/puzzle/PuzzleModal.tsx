import React, {MouseEventHandler} from "react";
import {Button, Modal} from "./../index";

interface PuzzleModalProps {
    onClose: MouseEventHandler<HTMLDivElement>,
    onCancel: MouseEventHandler<HTMLButtonElement>,
    onReset: MouseEventHandler<HTMLButtonElement>
}

const PuzzleModal: React.FC<PuzzleModalProps> = (props) => {
    const {
        onCancel,
        onClose,
        onReset
    } = props;
    return (
        <Modal onClose={onClose}
               actionBar={(
                   <div className=" pt-4 flex flex-row gap-2 justify-center">
                       <Button onClick={onReset} variant="danger">Yes, reset!</Button>
                       <Button onClick={onCancel} variant="secondary">Cancel</Button>
                   </div>)}>
            <h2 className="text-xl  font-bold  text-center">Are you sure you want to reset the puzzle?</h2>
        </Modal>
    );
};

export default PuzzleModal;