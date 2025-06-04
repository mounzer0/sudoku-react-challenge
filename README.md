Sudoku Game 🎯

A fully interactive **Sudoku puzzle game** built with **React**, **TypeScript**, and enhanced with features like:

- ✅ Puzzle generation (easy / medium / hard)
- ✅ Real-time conflict validation
- ✅ OCR image upload via `tesseract.js`
- ✅ Hint system
- ✅ Board save/load to `localStorage`
- ✅ Beautiful 3x3 grid layout
- ✅ Mobile-responsive interface

---

✨ Features

| Feature            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| 🎲 Generate Puzzle | Creates new Sudoku boards with varying difficulty.                          |
| 👓 OCR Upload      | Upload an image of a Sudoku puzzle — parsed via `tesseract.js`.             |
| 💾 Save/Load       | Save boards by name and load them later from a menu.                        |
| 💡 Hint System     | Get a hint for any empty cell using the pre-solved board.                   |
| 🧠 Check Conflicts | Highlights duplicate values in rows, columns, or blocks.                    |
| 📱 Mobile Ready    | Clean UI with responsive design and accessible controls.                    |

---

🧰 Tech Stack

- ⚛️ React + TypeScript
- 🎯 Tesseract.js for OCR
- 🧠 Custom Sudoku generator & solver
- 🧼 CSS Modules for styling

---

🚀 Getting Started

```bash
git clone https://github.com/mounzer0/sudoku-challenge.git
cd sudoku-react-challenge
npm install
npm run dev
Open http://localhost:5173 in your browser.

🧪 OCR Tips
OCR accuracy depends on image clarity. Use:

Well-lit scans
Dark text on white paper
Avoid handwritten puzzles (unless clear)

📂 Folder Structure
src/
  ├── components/       # Grid, Controls, OCRUpload, etc.
  ├── utils/            # Sudoku logic, helpers
  ├── App.tsx
  ├── SudokuBoard.tsx
  ├── SaveBoard.tsx

👤 Author
Name: Mounzer Ammar

GitHub: github.com/mounzer0

🎯 Challenge Info
This project was built as part of the NavyBits Internship Challenge.
It demonstrates TypeScript proficiency, clean component architecture, OCR integration, and UI state management.