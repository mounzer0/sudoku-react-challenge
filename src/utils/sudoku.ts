export function generateSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): { puzzle: string[][], solution: string[][] } {
    const fullBoard = Array(9).fill(null).map(() => Array(9).fill(''));

    const isValid = (row: number, col: number, num: string): boolean => {
        for (let i = 0; i < 9; i++) {
            if (fullBoard[row][i] === num || fullBoard[i][col] === num) return false;
        }

        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (fullBoard[i][j] === num) return false;
            }
        }

        return true;
    };

    const fillBoard = (): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (fullBoard[row][col] === '') {
                    const nums = shuffle(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
                    for (let num of nums) {
                        if (isValid(row, col, num)) {
                            fullBoard[row][col] = num;
                            if (fillBoard()) return true;
                            fullBoard[row][col] = '';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const removeCells = (board: string[][], difficulty = 'medium') => {
        let attempts = difficulty === 'easy' ? 30 : difficulty === 'hard' ? 50 : 40;
        while (attempts > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (board[row][col] !== '') {
                board[row][col] = '';
                attempts--;
            }
        }
    };

    const shuffle = (arr: string[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    fillBoard();
    const solution = fullBoard.map(row => [...row]);
    const puzzle = fullBoard.map(row => [...row]);
    removeCells(puzzle, difficulty);


    return { puzzle, solution };
}



export function solveSudoku(board: string[][]): string[][] | null {
    const clone = board.map(row => row.slice());

    const isValid = (row: number, col: number, num: string): boolean => {
        for (let i = 0; i < 9; i++) {
            if (clone[row][i] === num || clone[i][col] === num) return false;
        }

        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (clone[i][j] === num) return false;
            }
        }

        return true;
    };

    const solve = (): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (clone[row][col] === '') {
                    for (let num of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
                        if (isValid(row, col, num)) {
                            clone[row][col] = num;
                            if (solve()) return true;
                            clone[row][col] = '';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    return solve() ? clone : null;
}
