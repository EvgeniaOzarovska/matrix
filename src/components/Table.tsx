import React, {useContext, useMemo, useState} from "react";
import {MatrixContext, MatrixContextType} from "../provider/MatrixProvider.tsx";


export const Table: React.FC = () => {
    const context = useContext(MatrixContext) as MatrixContextType;
    const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const { matrix, updateCell } = context;

    const X = 5;

    const nearestCells = useMemo(() => {
        if (!hoveredCell) return [];

        const { row, col } = hoveredCell;
        const hoveredValue = matrix[row][col].amount;

        const allCells = matrix.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => ({
                row: rowIndex,
                col: colIndex,
                amount: cell.amount,
                diff: Math.abs(cell.amount - hoveredValue),
            }))
        );

        allCells.sort((a, b) => a.diff - b.diff);

        return allCells.slice(1, X + 1);
    }, [hoveredCell, matrix]);

    const calculateRowPercentages = (row: number) => {
        const rowCells = matrix[row];
        const total = rowCells.reduce((sum, cell) => sum + cell.amount, 0);
        return rowCells.map((cell) => ({
            id: cell.id,
            percentage: total === 0 ? 0 : Math.round((cell.amount / total) * 100),
        }));
    };

    const calculateRowHeatmap = (row: number) => {
        const rowCells = matrix[row];
        const maxValue = Math.max(...rowCells.map((cell) => cell.amount));
        return rowCells.map((cell) => ({
            id: cell.id,
            heat: maxValue === 0 ? 0 : Math.round((cell.amount / maxValue) * 100),
        }));
    };

    return (
        <>
            <h1>Table</h1>
            <table style={{border:'2px solid white'}}>
                <thead>
                <tr>
                    {Array.from({length: matrix[0].length}, (_, idx) => (
                        <th key={idx}>Column {idx + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {matrix.map((row, rowIndex) => {const percentages = hoveredRow === rowIndex ? calculateRowPercentages(rowIndex) : null;
                    const heatmap = calculateRowHeatmap(rowIndex)
                    return (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            const heat = heatmap[colIndex]?.heat || 0;
                            const percentage = percentages?.find((p) => p.id === cell.id)?.percentage;
                            const isNearest = nearestCells.some(
                                (nearest) => nearest.row === rowIndex && nearest.col === colIndex
                            );

                            return (
                            <td style={{border:'2px solid white',
                                backgroundColor: isNearest ? "yellow" : "green",
                                cursor: "pointer",
                                background: `rgba(255, 0, 0, ${heat / 100})`,
                                color: hoveredRow === rowIndex ? "white" : "black",}}
                                key={cell.id}
                                onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                                onMouseLeave={() => setHoveredCell(null)}
                                onClick={() => updateCell(rowIndex, colIndex, cell.amount + 1)}
                            >
                                {hoveredRow === rowIndex ? `${percentage}%` : cell.amount}
                            </td>
                        )}
                        )}
                        <td
                            onMouseEnter={() => setHoveredRow(rowIndex)}
                            onMouseLeave={() => setHoveredRow(null)}
                            style={{ fontWeight: "bold", cursor: "pointer" }}
                        >
                            {row.reduce((sum, cell) => sum + cell.amount, 0)}
                        </td>
                    </tr>
                )}
                )}
                </tbody>
            </table>
            </>
            );
            };
