export const getNumbersRange = (n1: number, n2: number): number[] => {
    let min = Math.min(n1, n2);
    const max = Math.max(n1, n2);
    let range = [];
    if (min !== max) {
        for (; min < max; min++) {
            range.push(min);
        }
    }
    range.push(max);
    return range;
}