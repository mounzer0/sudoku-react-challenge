import React from 'react';

interface ControlsProps {
    difficulty: 'easy' | 'medium' | 'hard';
    onDifficultyChange: (level: 'easy' | 'medium' | 'hard') => void;
    onCheck: () => void;
    onReset: () => void;
    onGenerate: () => void;
    onSolve: () => void;
    onSave: () => void;
    onHint: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    difficulty,
    onDifficultyChange,
    onCheck,
    onReset,
    onGenerate,
    onSolve,
    onSave,
    onHint
}) => {
    return (
        <>
            <div className="difficulty-selector">
                <label>Select Difficulty: </label>
                <select value={difficulty} onChange={(e) => onDifficultyChange(e.target.value as 'easy' | 'medium' | 'hard')}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="buttons">
                <button onClick={onCheck} className="check-button">Check Solution</button>
                <button onClick={onReset} className="reset-button">Reset Board</button>
                <button onClick={onGenerate} className="generate-button">Generate Puzzle</button>
                <button onClick={onSolve} className="solve-button">Solve</button>
                <button onClick={onSave} className="save-button">Save</button>
                <button onClick={onHint} className="hint-button">Hint</button>
            </div>
        </>
    );
};

export default Controls;
