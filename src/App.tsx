import {Puzzle} from "./components";
import PuzzleProvider from "./contexts/puzzle";

function App() {
    return (
        <div className="bg-slate-100 h-dvh">
            <div className="container mx-auto xl">
                <PuzzleProvider>
                    <Puzzle/>
                </PuzzleProvider>
            </div>
        </div>
    )
}

export default App