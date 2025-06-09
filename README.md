# 🧩 Sudoku Game 🎯

A fully interactive **Sudoku puzzle game** built with **React**, **TypeScript**, and enhanced with features like:

- ✅ Puzzle generation (easy / medium / hard)
- ✅ Real-time conflict validation
- ✅ OCR image upload via `tesseract.js`
- ✅ Hint system
- ✅ Board save/load to `localStorage`
- ✅ Beautiful 3x3 grid layout
- ✅ Mobile-responsive interface

---

## ✨ Features

| Feature            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| 🎲 Generate Puzzle | Creates new Sudoku boards with varying difficulty.                          |
| 👓 OCR Upload      | Upload an image of a Sudoku puzzle — parsed via `tesseract.js`.             |
| 💾 Save/Load       | Save boards by name and load them later from a menu.                        |
| 💡 Hint System     | Get a hint for any empty cell using the pre-solved board.                   |
| 🧠 Check Conflicts | Highlights duplicate values in rows, columns, or blocks.                    |
| 📱 Mobile Ready    | Clean UI with responsive design and accessible controls.                    |

---

## 🧰 Tech Stack

- ⚛️ React + TypeScript
- 🎯 Tesseract.js for OCR
- 🧠 Custom Sudoku generator & solver
- 🧼 CSS Modules for styling

---

## 🚀 Getting Started

```bash
git clone https://github.com/mounzer0/sudoku-challenge.git
cd sudoku-challenge
npm install
npm run dev
Open http://localhost:5173 in your browser.

🧪 OCR Tips
OCR accuracy depends on image clarity. Use:

Well-lit scans

Dark printed digits on white paper

Avoid handwritten puzzles (unless clearly written)

Prefer full 9×9 boards (partial ones are not supported yet)

📂 Folder Structure

src/
├── components/       # Grid, Cell, Controls, OCRUpload
├── utils/            # Sudoku logic & helpers
├── App.tsx
├── SudokuBoard.tsx
├── SaveBoard.tsx

👤 Author
Name: Mounzer Ammar
GitHub: @mounzer0

🎯 Challenge Info
This project was built as part of the NavyBits Internship Challenge.

It demonstrates:

📦 TypeScript proficiency

⚛️ Clean React component architecture

🔍 OCR integration with tesseract.js

💾 Persistent state with localStorage

💡 UX features like hint, solve, validation, difficulty

🧠 OCR Feature: Current Limitations & Notes
The app includes an OCR (Optical Character Recognition) feature using tesseract.js to extract Sudoku puzzles from uploaded images. While functional, the current implementation has important limitations:

⚠️ Known Limitations
Requires a Full Board: OCR only works reliably when all 81 cells are filled. Boards with empty cells often fail.

Grid Clarity is Critical: Works best with high-contrast, printed Sudoku boards. Shadows, angles, and handwriting can reduce accuracy.

No Error Correction Yet: Misread digits (e.g., a 5 detected as 6) are not validated or corrected automatically.

No Grid Detection: Assumes digits are arranged in a clean 9×9 grid. It doesn’t detect or align cell boxes from images.

📸 Suggested Usage
To get the best results:

Use clean, printed Sudoku puzzles

Take photos in good lighting, without shadows

Avoid angles — keep the camera parallel to the paper

Do not use stylized or handwritten numbers

🚧 Future Improvements
🧠 Add digit correction or validation after OCR

🖼️ Support partial grids and handle blank cells

🔍 Detect grid lines and align digits using OpenCV or Canvas

📝 Allow user to manually confirm/adjust OCR result