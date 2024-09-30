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
  id: number;
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

ModuleRegistry.register(ClientSideRowModelModule);
const QuickStart = () => {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false },
    { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { id: 4, make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { id: 5, make: "Fiat", model: "500", price: 15774, electric: false },
    { id: 6, make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "id", headerName: "Id", cellDataType: "number", editable: false },
    { field: "make", headerName: "Maker", cellDataType: "string" },
    { field: "model", headerName: "Model", cellDataType: "string" },
    { field: "price", headerName: "$Price", cellDataType: "number" },
    { field: "electric", headerName: "Electric", cellDataType: "boolean" },
  ]);

  const defaultColDef = {
    flex: 1,
    editable: true,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz grid-wrapper"}>
      <div>Ag Grid Actions</div>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        readOnlyEdit={false}
        defaultColDef={defaultColDef}

      />
    </div>
  );
};

export default QuickStart;
