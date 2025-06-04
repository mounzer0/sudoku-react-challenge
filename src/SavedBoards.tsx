import React, { useEffect, useState } from 'react';

type SavedBoardsProps = {
    onLoadNamedBoard: (name: string) => void;
    refreshToken: number;
};


const SavedBoards: React.FC<SavedBoardsProps> = ({ onLoadNamedBoard, refreshToken }) => {
    const [savedKeys, setSavedKeys] = useState<string[]>([]);

    useEffect(() => {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('sudoku-save-'));
        setSavedKeys(keys);
    }, [refreshToken]); // refresh when this changes


    const handleDelete = (key: string) => {
        localStorage.removeItem(key);
        setSavedKeys(keys => keys.filter(k => k !== key));
    };

   return (
  <div className="saved-boards">
    <h2>📂 Saved Sudoku Boards</h2>
    {savedKeys.length === 0 ? (
      <p>No saved boards yet.</p>
    ) : (
      <div className="saved-board-grid">
        {savedKeys.map(key => (
          <div className="saved-card" key={key}>
            <div className="saved-title">{key.replace('sudoku-save-', '')}</div>
            <div className="saved-actions">
              <button className="load-btn" onClick={() => onLoadNamedBoard(key)}>Load</button>
              <button className="delete-btn" onClick={() => handleDelete(key)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


};

export default SavedBoards;
