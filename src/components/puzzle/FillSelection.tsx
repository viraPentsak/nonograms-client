import {ReactNode, CSSProperties, FC, useEffect} from "react";
import {CellFill} from "@/types";
import {crossIcon} from "@/assets";
import {usePuzzleByRoute} from "@/hooks/usePuzzle.ts";

interface FillSelectionProps {
    selectedFill: CellFill,
    setFill: (cellFill: CellFill) => void
}

const FillSelection: FC<FillSelectionProps> = (props) => {
    const {puzzle, isLoading} = usePuzzleByRoute();
    if (!puzzle) return null;

    const {colors} = puzzle;
    const {setFill} = props;

    useEffect(() => {
        setFill(colors[0])
    }, [isLoading])

    const onClickHandler = () => setFill("none");

    const itemClassNames = "w-24 h-10 border-2 rounded-md  border-slate-500 mx-1  bg-repeat  cursor-pointer"
    const defaultStyling: CSSProperties = {
        backgroundImage: `url(${crossIcon})`,
        backgroundSize: "12px"
    };
    const fillsRendered: ReactNode[] = colors.map((color) => {
        const style: CSSProperties = {backgroundColor: `${color}`};
        return <div className={itemClassNames}
                    onClick={() => setFill(color)}
                    style={style}
                    key={color}/>
    });

    return (
        <>
            <h3 className="text-xl text-center py-2">Select color:</h3>
            <div className="flex flex-row justify-center pb-4 text-slate-50">
                {fillsRendered}
                {/*"None" color selection*/}
                <div className={itemClassNames}
                     onClick={onClickHandler}
                     style={defaultStyling}
                     key={"empty"}/>
            </div>
        </>
    );
};

export default FillSelection;
