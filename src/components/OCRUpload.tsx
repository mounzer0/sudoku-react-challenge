import React from 'react';

interface OCRUploadProps {
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
}

const OCRUpload: React.FC<OCRUploadProps> = ({ onImageUpload, isLoading }) => {
    return (
        <div className="ocr-upload">
            <label>Upload Sudoku Image: </label>
            <input type="file" accept="image/*" onChange={onImageUpload} />

            {isLoading && (
                <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#555' }}>
                    🕓 Reading image... Please wait.
                </p>
            )}
        </div>
    );
};

export default OCRUpload;
