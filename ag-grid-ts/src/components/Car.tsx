import { useCallback, useMemo, useRef, useState } from "react";
// Theme
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./Car.css";
import { CellClassParams, ColDef, ColTypeDef, EditableCallbackParams, GridReadyEvent, ModuleRegistry, RowPinnedType } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ICar } from "../view_models/Car";

ModuleRegistry.register(ClientSideRowModelModule);
const Car = () => {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true, year: new Date(2024, 1, 1) },
    { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false, year: new Date(2024, 11, 1) },
    { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false, year: new Date(2024, 10, 1) },
    { id: 4, make: "Mercedes", model: "EQA", price: 48890, electric: true, year: new Date(2024, 1, 3) },
    { id: 5, make: "Fiat", model: "500", price: 15774, electric: false, year: new Date(2024, 1, 4) },
    { id: 6, make: "Nissan", model: "Juke", price: 20675, electric: false, year: new Date(2024, 1, 13) },
  ]);

  const [pinnedTopRowData] = useState([
    { id: 7, make: "Tesla-top", model: "Model 3-top", price: 54950, electric: true, year: new Date(2024, 1, 1) },
    { id: 9, make: "Tesla-top2", model: "Model 3-top2", price: 54950, electric: true, year: new Date(2024, 1, 1) }
  ]);

  const [pinnedBottomRowData] = useState([
    { id: 8, make: "Tesla-bottom", model: "Model 3-bottom", price: 54950, electric: true, year: new Date(2024, 1, 1) }
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<ICar>[]>([
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
    { field: "quantity", headerName: "Quantity", cellDataType: "number", editable: (params) => { return params.data != undefined && params.data.price > 30000 && params.data.price < 100000; } },
    { field: "electric", headerName: "Electric", cellDataType: "boolean" },
    {
      headerName: "Year",
      cellDataType: "string",
      valueGetter: (params) => params?.data?.year.toLocaleDateString(),
      valueSetter: (params) => {
        params.data.year = new Date(params.newValue);
        return true;
      }
    },
  ]);

  const defaultColDef = {
    flex: 1,
    editable: true,
  };

  function handleGridReady(event: GridReadyEvent<{ id: number; make: string; model: string; price: number; electric: boolean; year: Date; }, any>): void {
    console.log('handle ag-grid->', event);
  }

  const columnTypes = useMemo<{ [key: string]: ColTypeDef; }>(() => {
    return {
      editableColumn: {
        editable: (params: EditableCallbackParams<ICar>) => {
          return true;
        },
        cellStyle: (params: CellClassParams<ICar>) => {
          return { backgroundColor: "lightgreen" }
        },
      }
    }
  }, []);

  const GetEdittingCells = () => {
    const cells = agGridRef?.current?.api.getEditingCells();
    console.log(cells);
    if (cells) {
      cells.forEach(cell => {
        console.log(cell.rowIndex, cell.column.getId(), cell.rowPinned);
      })
    }
  };

  const agGridRef = useRef<AgGridReact>(null);
  const handleBtnEdit = (rowIndex: number, colName: string, key?: string, pinned?: RowPinnedType) => {
    agGridRef?.current?.api.setFocusedCell(rowIndex, colName, pinned)
    agGridRef?.current?.api.startEditingCell({
      rowIndex,
      colKey: colName,
      rowPinned: pinned,
      key: key,
    });
  };
  const handleStopEditing = () => {
    agGridRef?.current?.api.stopEditing();
  }
  const handleNext = () => {
    agGridRef?.current?.api.tabToNextCell();
  };
  const handlePrevious = () => {
    agGridRef?.current?.api.tabToPreviousCell();
  }
  const handleRowEditingStarted = useCallback((event) => {
    console.log("never called - not doing row editing");
  }, []);

  const handleRowEditingStopped = useCallback((event) => {
    console.log("never called - not doing row editing");
  }, []);

  const handleCellEditingStarted = useCallback((event) => {
    console.log("cellEditingStarted");
  }, []);

  const handleCellEditingStopped = useCallback((event) => {
    console.log("cellEditingStopped");
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz grid-wrapper"}>
      <div>
        <button onClick={GetEdittingCells}>Get Editing Cells
        </button>
        <button onClick={() => handleBtnEdit(0, "model")}>Edit Model
        </button>
        <button onClick={() => handleBtnEdit(0, "model", 'M')}>Edit Model with M
        </button>
        <button onClick={() => handleBtnEdit(0, "model", 'Backspace')}>Edit Model with clear first
        </button>
        <button onClick={() => handleBtnEdit(0, 'model', undefined, 'top')}>Edit Model of top pinned 1
        </button>
        <button onClick={() => handleBtnEdit(1, 'model', undefined, 'top')}>Edit Model of top pinned 2
        </button>
        <button onClick={() => handleBtnEdit(0, 'model', undefined, 'bottom')}>Edit Model of bottom pinned 1
        </button>
        <button onClick={() => handleNext()}>Next
        </button>
        <button onClick={() => handlePrevious()}>Previous
        </button>
        <button onClick={() => handleStopEditing()}>Stop Editing
        </button>
      </div>
      <AgGridReact
        ref={agGridRef}
        rowData={rowData}
        pinnedTopRowData={pinnedTopRowData}
        pinnedBottomRowData={pinnedBottomRowData}
        columnDefs={colDefs}
        columnTypes={columnTypes}
        readOnlyEdit={false}
        defaultColDef={defaultColDef}
        onGridReady={handleGridReady}
        onRowEditingStarted={handleRowEditingStarted}
        onRowEditingStopped={handleRowEditingStopped}
        onCellEditingStarted={handleCellEditingStarted}
        onCellEditingStopped={handleCellEditingStopped}

      />
    </div>
  );
};

export default Car;
