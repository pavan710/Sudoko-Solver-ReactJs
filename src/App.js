import React, { useState } from 'react';
import SudokuGrid from './SudokuGrid';
import './App.css';

const isValid = (grid, row, col, num) => {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) return false;
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) return false;
        }
    }

    return true;
};

const solveSudoku = (grid) => {
    const solve = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === '') {
                    for (let num = 1; num <= 9; num++) {
                        const numStr = num.toString();
                        if (isValid(grid, row, col, numStr)) {
                            grid[row][col] = numStr;
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

    return solve() ? grid : false;
};


const validateGrid = (grid) => {
    const checkRowColAndSubgrid = (grid) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] !== '') {
                    const num = grid[row][col];
                    grid[row][col] = ''; 
                    if (!isValid(grid, row, col, num)) {
                        return false; 
                    }
                    grid[row][col] = num;
                }
            }
        }
        return true;
    };

    return checkRowColAndSubgrid(grid);
};

const App = () => {
    const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill('')));
    const [error, setError] = useState('');

    const handleSolve = () => {
        const gridCopy = grid.map(row => [...row]);
        if (!validateGrid(gridCopy)) {
            setError('Invalid grid: duplicate numbers found.');
            return;
        }

        const result = solveSudoku(gridCopy);
        if (result) {
            setGrid(result);
            setError('');
        } else {
            setError('No solution exists or the Sudoku puzzle is invalid.');
        }
    };

    const handleClear = () => {
        setGrid(Array.from({ length: 9 }, () => Array(9).fill('')));
        setError('');
    };

    return (
        <div className="app">
            <h1>Sudoku Solver</h1>
            <SudokuGrid grid={grid} onChange={setGrid} />
            <div className="buttons">
                <button onClick={handleSolve} className='solve'>Solve</button>
                <button onClick={handleClear} className='clear'>Clear</button>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default App;
