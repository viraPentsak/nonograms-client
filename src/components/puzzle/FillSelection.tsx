import React, {useContext} from "react";
import {CellFill, Color} from "../../types/index";
import {crossIcon} from "./../../assets";
import {PuzzleContext} from "../../contexts/index";

interface FillSelectionProps {
    selectedFill: Color,
    setFill: (cellFill: CellFill) => void
}

const FillSelection = (props: FillSelectionProps) => {
    const puzzle = useContext(PuzzleContext);
    if (!puzzle) {
        return null
    }

    const {colors}: FillSelectionProps = puzzle;
    const {setFill} = props;

    const setNoneFill = ()=>setFill("none");

    const itemClassNames = "w-24 h-10 border-2 rounded-md  border-slate-500 mx-1  bg-repeat"
    const defaultStyling: React.CSSProperties = {
        backgroundImage: `url(${crossIcon})`,
        backgroundSize: "12px"
    };
    const fillsRendered: React.ReactNode[] = colors.map((color) => {
        const style: React.CSSProperties = {backgroundColor: `${color}`};
        return <div className={itemClassNames}
                    onClick={() => setFill(color)}
                    style={style}
                    key={color}/>
    });

    return (
        <>
            <h3 className="text-xl text-center py-2">Select color:</h3>
            <div className="flex flex-row justify-center pb-4">
                {fillsRendered}
                <div className={itemClassNames}
                     onClick={setNoneFill}
                     style={defaultStyling}
                     key={"empty"}/>
            </div>
        </>
    );
};

export default FillSelection;