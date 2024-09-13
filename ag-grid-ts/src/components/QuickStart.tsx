import { useState } from "react";
// Theme
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./QuickStart.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

ModuleRegistry.register(ClientSideRowModelModule);
const QuickStart = () => {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "make", headerName: "Maker" },
    { field: "model", headerName: "Model" },
    { field: "price", headerName: "$Price" },
    { field: "electric", headerName: "Electric" },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz grid-wrapper"}>
      <div>Ag Grid Actions</div>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default QuickStart;
