import React, {useContext} from "react";
import {MatrixContext, MatrixContextType} from "../provider/MatrixProvider.tsx";

export const Controls: React.FC = () => {
    const { addRow, removeRow, matrix } = useContext(MatrixContext) as MatrixContextType;

    return (
        <div style={{padding: '10px'}}>
            <button onClick={addRow}>Add Row</button>
            <button onClick={() => removeRow(matrix.length - 1)}>Remove Row</button>
        </div>
    );
};
