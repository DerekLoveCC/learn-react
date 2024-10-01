import { useState } from "react";
// Theme
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./ReadonlyEditGrid.css";
import { CellEditRequestEvent, ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

ModuleRegistry.register(ClientSideRowModelModule);

const ReadonlyEditGrid = () => {
    // Row Data: The data to be displayed.
    const [rowData] = useState([
        { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true, year: new Date(2024, 1, 1) },
        { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false, year: new Date(2024, 11, 1) },
        { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false, year: new Date(2024, 10, 1) },
        { id: 4, make: "Mercedes", model: "EQA", price: 48890, electric: true, year: new Date(2024, 1, 3) },
        { id: 5, make: "Fiat", model: "500", price: 15774, electric: false, year: new Date(2024, 1, 4) },
        { id: 6, make: "Nissan", model: "Juke", price: 20675, electric: false, year: new Date(2024, 1, 13) },
    ]);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef[]>([
        { field: "id", headerName: "Id", cellDataType: "number", editable: false },
        { field: "make", headerName: "Maker", cellDataType: "string", type: "editableColumn" },
        { field: "model", headerName: "Model", cellDataType: "string" },
        {
            field: "price", headerName: "$Price", valueFormatter: (params) => `$${params.value}`, valueParser: (params) => {
                if (!params.newValue) {
                    return null;
                }

                if (typeof params.newValue == 'number') {
                    return params.newValue;
                }
                return Number(params.newValue?.replace(/[^\d.-]/g, ''));
            }
        },
        { field: "quantity", headerName: "Quantity", cellDataType: "number" },
        { field: "electric", headerName: "Electric", cellDataType: "boolean" },
        { field: 'year', headerName: "Year", cellDataType: "string" },
    ]);

    const defaultColDef = {
        flex: 1,
        editable: true,
    };

    function handleCellEditRequest(event: CellEditRequestEvent<any, any>): void {
        console.log(event);
    }
    const getRowId = (row: any) => {
        return row.id; // Assuming your row has an 'id' property
    };

    return (
        <div className={"ag-theme-quartz grid-wrapper"}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                getRowId={getRowId}
                readOnlyEdit={true}
                onCellEditRequest={handleCellEditRequest}
            />
        </div>
    );
};
export default ReadonlyEditGrid;
