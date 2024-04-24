import React, {CSSProperties} from "react";
import {CellFill} from "../../types/index";
import {crossIcon} from "./../../assets";

interface FillSwatchProps {
    selectedFill: CellFill
}

const FillSwatch: React.FC<FillSwatchProps> = ({selectedFill}) => {

    const swatchStyling: CSSProperties = {
        backgroundImage: selectedFill === "none" ? `url(${crossIcon})` : "none",
        backgroundSize: "12px",
        backgroundColor: (selectedFill !== "none") ? selectedFill : "transparent"
    }
    return (
        <div className="inset-0 absolute" style={swatchStyling}/>
    );
};

export default FillSwatch;