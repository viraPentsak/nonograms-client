import {Puzzle} from "./components";
import {items} from './../mockdata/data.json'
import {I_Puzzle} from "./types/index";

function App() {
    const puzzle = items[0] as I_Puzzle;
    return (
        <div className="bg-slate-100 h-dvh">
            <div className="container mx-auto xl">

                <Puzzle {...puzzle}/>
            </div>
        </div>
    )
}

export default App