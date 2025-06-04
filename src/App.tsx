import { useState } from 'react';
import SudokuBoard from './SudokuBoard';
import SavedBoards from './SavedBoards';

function App() {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const refreshSavedBoards = () => {
    setRefreshToken(prev => prev + 1);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sudoku Game</h1>
      <SudokuBoard loadNamedBoard={selectedBoard} onSaveComplete={refreshSavedBoards} />
      <hr />
      <SavedBoards onLoadNamedBoard={setSelectedBoard} refreshToken={refreshToken} />
    </div>
  );
}

export default App;