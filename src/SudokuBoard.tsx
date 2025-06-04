import './SudokuBoard.css';
import React, { useState, useEffect } from 'react';
import { generateSudoku, solveSudoku } from './utils/sudoku';
import { getCellClass, isCellEditable } from './utils/helpers';
import Tesseract from 'tesseract.js';

import Grid from './components/Grid';
import Controls from './components/Controls';
import OCRUpload from './components/OCRUpload';

type SudokuBoardProps = {
    loadNamedBoard?: string | null;
    onSaveComplete?: () => void;
};

const EMPTY_BOARD = Array(9).fill(null).map(() => Array(9).fill(''));

const SudokuBoard: React.FC<SudokuBoardProps> = ({ loadNamedBoard, onSaveComplete }) => {
    const [board, setBoard] = useState(EMPTY_BOARD);
    const [conflicts, setConflicts] = useState(new Set<string>());
    const [solution, setSolution] = useState<string[][] | null>(null);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [isLoadingOCR, setIsLoadingOCR] = useState(false);
    const [fixedCells, setFixedCells] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (loadNamedBoard) {
            const saved = localStorage.getItem(loadNamedBoard);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.board && parsed.solution) {
                        setBoard(parsed.board);
                        setSolution(parsed.solution);
                        setConflicts(new Set());
                        alert(`Loaded board: ${loadNamedBoard.replace('sudoku-save-', '')}`);
                    }
                } catch (e) {
                    console.error('Error loading board:', e);
                }
            }
        }
    }, [loadNamedBoard]);

    const handleChange = (row: number, col: number, value: string) => {
        if (/^[1-9]?$/.test(value)) {
            const newBoard = board.map((r, i) =>
                r.map((cell, j) => (i === row && j === col ? value : cell))
            );
            setBoard(newBoard);
        }
    };

    const checkConflicts = () => {
        const newConflicts = new Set<string>();

        for (let i = 0; i < 9; i++) {
            const seen = new Map<string, number>();
            for (let j = 0; j < 9; j++) {
                const val = board[i][j];
                if (val) {
                    if (seen.has(val)) {
                        newConflicts.add(`${i}-${j}`);
                        newConflicts.add(`${i}-${seen.get(val)}`);
                    } else {
                        seen.set(val, j);
                    }
                }
            }
        }

        for (let j = 0; j < 9; j++) {
            const seen = new Map<string, number>();
            for (let i = 0; i < 9; i++) {
                const val = board[i][j];
                if (val) {
                    if (seen.has(val)) {
                        newConflicts.add(`${i}-${j}`);
                        newConflicts.add(`${seen.get(val)}-${j}`);
                    } else {
                        seen.set(val, i);
                    }
                }
            }
        }

        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const seen = new Map<string, [number, number]>();
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const row = boxRow * 3 + i;
                        const col = boxCol * 3 + j;
                        const val = board[row][col];
                        if (val) {
                            if (seen.has(val)) {
                                const [conflictRow, conflictCol] = seen.get(val)!;
                                newConflicts.add(`${row}-${col}`);
                                newConflicts.add(`${conflictRow}-${conflictCol}`);
                            } else {
                                seen.set(val, [row, col]);
                            }
                        }
                    }
                }
            }
        }

        setConflicts(newConflicts);
    };

    const resetBoard = () => {
        setBoard(EMPTY_BOARD);
        setConflicts(new Set());
    };

    const generateNewPuzzle = () => {
        const { puzzle, solution } = generateSudoku(difficulty);
        setBoard(puzzle);
        setSolution(solution);
        setConflicts(new Set());

        const fixed = new Set<string>();
        puzzle.forEach((row, i) =>
            row.forEach((val, j) => {
                if (val !== '') fixed.add(`${i}-${j}`);
            })
        );
        setFixedCells(fixed);
    };


    const saveBoard = () => {
        const name = prompt('Enter a name for this board:');
        if (!name) return;

        const key = `sudoku-save-${name}`;
        const state = { board, solution };
        localStorage.setItem(key, JSON.stringify(state));
        alert('Board saved successfully.');
        onSaveComplete?.();
    };

    const solveBoard = () => {
        const solved = solveSudoku(board);
        if (solved) {
            setBoard(solved);
            setSolution(solved);
            setConflicts(new Set());
        } else {
            alert('This puzzle has no solution!');
        }
    };

    const giveHint = () => {
        if (!solution) {
            alert('No solution available. Try solving first.');
            return;
        }

        const emptyCells: [number, number][] = [];
        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === '') emptyCells.push([i, j]);
            });
        });

        if (emptyCells.length === 0) {
            alert('Board is already full!');
            return;
        }

        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newBoard = board.map((r, i) =>
            r.map((c, j) => (i === row && j === col ? solution[i][j] : c))
        );

        setBoard(newBoard);
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoadingOCR(true);
        try {
            const imageUrl = URL.createObjectURL(file);
            const result = await Tesseract.recognize(imageUrl, 'eng', {
                logger: m => console.log(m),
            });

            const rawDigits = result.data.text.replace(/[^0-9]/g, '').replace(/0/g, '');
            if (rawDigits.length < 81) {
                alert(`Only ${rawDigits.length} digits found — please upload a clearer, high-contrast image.`);
                return;
            }

            const newBoard: string[][] = [];
            for (let i = 0; i < 9; i++) {
                const row: string[] = [];
                for (let j = 0; j < 9; j++) {
                    row.push(rawDigits[i * 9 + j] ?? '');
                }
                newBoard.push(row);
            }

            setBoard(newBoard);
            const fixed = new Set<string>();
            newBoard.forEach((row, i) =>
                row.forEach((val, j) => {
                    if (val !== '') fixed.add(`${i}-${j}`);
                })
            );
            setFixedCells(fixed);

            const solved = solveSudoku(newBoard);
            if (solved) setSolution(solved);
        } catch (error) {
            console.error('OCR failed:', error);
            alert('Something went wrong during OCR. Try a simpler image.');
        } finally {
            setIsLoadingOCR(false);
        }
    };

    return (
        <div className="sudoku-wrapper">
            <OCRUpload onImageUpload={handleImageUpload} isLoading={isLoadingOCR} />

            <Grid
                board={board}
                conflicts={conflicts}
                onChange={handleChange}
                isCellEditable={(row, col) => isCellEditable(fixedCells, row, col)}  // ✅ FIXED
                getCellClass={getCellClass}
            />


            <Controls
                difficulty={difficulty}
                onDifficultyChange={setDifficulty}
                onCheck={checkConflicts}
                onReset={resetBoard}
                onGenerate={generateNewPuzzle}
                onSolve={solveBoard}
                onSave={saveBoard}
                onHint={giveHint}
            />
        </div>
    );
};

export default SudokuBoard;