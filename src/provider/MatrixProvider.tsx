import React, {createContext, useState} from "react";

export type Cell = {
    id: number;
    amount: number;
};

export type MatrixContextType = {
    matrix: Cell[][];
    updateCell: (row: number, col: number, amount: number) => void;
    addRow: () => void;
    removeRow: (rowIndex: number) => void;
};

export const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [matrix, setMatrix] = useState<Cell[][]>(() => generateMatrix(5, 5));

     const updateCell = (row: number, col: number, amount: number) => {
        setMatrix((prev) => {
            const newMatrix = [...prev];
            newMatrix[row][col] = { ...newMatrix[row][col], amount };
            return newMatrix;
        });
    };

    const addRow = () => {
        setMatrix((prev) => {
            const newRow = generateRow(prev[0].length);
            return [...prev, newRow];
        });
    };

    const removeRow = (rowIndex: number) => {
        setMatrix((prev) => prev.filter((_, idx) => idx !== rowIndex));
    };

    return (
        <MatrixContext.Provider value={{ matrix, updateCell, addRow, removeRow }}>
    {children}
    </MatrixContext.Provider>
);
};
const generateRow = (columns: number): Cell[] => {
    return Array.from({ length: columns }, (_, idx) => ({
        id: Date.now() + idx,
        amount: Math.floor(Math.random() * 900 + 100),
    }));
};

const generateMatrix = (rows: number, cols: number): Cell[][] => {
    return Array.from({ length: rows }, () => generateRow(cols));
};
