const isValid = (grid, row, col, num) => {
    
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) return false;
    }

    
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) return false;
        }
    }
    return true;
};

const solveSudoku = (grid, maxIterations = 1000000) => {
    let iteration = 0;

    const solve = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === '') {
                    for (let num = 1; num <= 9; num++) {
                        const numStr = num.toString();
                        if (isValid(grid, row, col, numStr)) {
                            grid[row][col] = numStr;
                            iteration++;
                            if (iteration > maxIterations) {
                                throw new Error('Maximum iterations exceeded');
                            }
                            if (solve()) return true;
                            grid[row][col] = ''; 
                        }
                    }
                    return false;
                }
            }
        }
        return true; 
    };

    try {
        return solve();
    } catch (e) {
        return false;
    }
};

export default solveSudoku;
