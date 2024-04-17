import ReactDOM from "react-dom";
import React, {ReactNode} from "react";

interface ModalProps {
    onClose: Function,
    actionBar: ReactNode
}

const Modal: React.FC = ({children, onClose, actionBar}: ModalProps) => {
    const modalContainer = document.querySelector("#modal-container");
    if (!modalContainer) return null;

    const renderedModal = (
        <div>
            <div className="fixed  inset-0   bg-slate-300  opacity-80" onClick={onClose}/>
            <div className="fixed  inset-10 sm:inset-16  bg-white p-6  min-h-min  min-w-80 max-w-screen-md	mx-auto">
                <div className="flex  flex-col  justify-between h-full">
                    {children}
                    <div className="flex-justify-end">
                        {actionBar}
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(renderedModal, modalContainer);
};

export default Modal;