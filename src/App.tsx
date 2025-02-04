import React from "react";
import "./App.css";
import {Table} from "./components/Table.tsx";
import {MatrixProvider} from "./provider/MatrixProvider.tsx";
import {Controls} from "./components/Controls.tsx";

const App: React.FC = () => {
    return (
        <MatrixProvider>
            <div className="App">
                <Table />
                <Controls />
            </div>
        </MatrixProvider>
    );
};

export default App;
