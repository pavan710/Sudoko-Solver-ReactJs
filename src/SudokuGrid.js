import React from 'react';

const SudokuGrid = ({ grid, onChange }) => {
    const handleChange = (row, col, value) => {
        if (value === '' || /^[1-9]$/.test(value)) {
            const newGrid = grid.map((r, rowIndex) =>
                rowIndex === row
                    ? r.map((cell, colIndex) => (colIndex === col ? value : cell))
                    : r
            );
            onChange(newGrid);
        }
    };

    return (
        <div className="sudoku-grid">
            {grid.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                    <input
                        key={`${rowIndex}-${colIndex}`}
                        type="number"
                        min="1"
                        max="9"
                        value={value}
                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    />
                ))
            )}
        </div>
    );
};

export default SudokuGrid;
