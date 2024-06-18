const PATHS = {
    API: import.meta.env.VITE_API_URL,

    puzzleURL(id: string) {
        return `${this.API}/puzzles/${id}`;
    },
    solutionURL(puzzleId: string) {
        return `${this.API}/solutions/${puzzleId}`
    },
    userSolution(puzzleId: string, userId: string) {
        return `${this.API}/userSolutions/${userId}|${puzzleId}`
    }
};


export default PATHS;
