export const getCellClass = (row: number, col: number): string => {
    const classes = [];
    if ((col + 1) % 3 === 0 && col !== 8) classes.push('border-right');
    if ((row + 1) % 3 === 0 && row !== 8) classes.push('border-bottom');
    return classes.join(' ');
};

export const isCellEditable = (board: string[][], row: number, col: number): boolean => {
    return board[row][col] === '';
};
