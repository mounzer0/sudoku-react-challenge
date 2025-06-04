import React from 'react';
import Cell from './Cell';

interface GridProps {
    board: string[][];
    conflicts: Set<string>;
    onChange: (row: number, col: number, value: string) => void;
    isCellEditable: (row: number, col: number) => boolean;
    getCellClass: (row: number, col: number) => string;
}

const Grid: React.FC<GridProps> = ({ board, conflicts, onChange, isCellEditable, getCellClass }) => {
    return (
        <div className="sudoku-board">
            {board.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((cell, colIndex) => {
                        const key = `${rowIndex}-${colIndex}`;
                        return (
                            <Cell
                                key={key}
                                value={cell}
                                onChange={(val) => onChange(rowIndex, colIndex, val)}
                                isConflict={conflicts.has(key)}
                                disabled={!isCellEditable(rowIndex, colIndex)}
                                extraClass={getCellClass(rowIndex, colIndex)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Grid;
