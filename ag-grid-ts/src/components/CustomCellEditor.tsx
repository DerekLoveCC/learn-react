import { useMemo, useState } from "react";
// Theme
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./CustomCellEditor.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import getStudentData from "../data/student";
import SimpleTextEditor from "./Editors/SimpleTextEditor";
import GenderRenderer from "./Editors/GenderRenderer";
import MoodRenderer from "./Editors/MoodRenderer";
import MoodEditor from "./Editors/MoodEditor";
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';

ModuleRegistry.registerModules([RichSelectModule]);
ModuleRegistry.register(ClientSideRowModelModule);

const CustomCellEditor = () => {
    const [rowData] = useState(getStudentData());
    const [columnDefs] = useState<any>([
        { field: 'first_name', headerName: 'Simple Text' },
        {
            field: 'last_name',
            headerName: 'Custom Text',
            cellEditor: SimpleTextEditor,
        },
        {
            field: 'age',
            headerName: 'Provided Number',
            cellEditor: 'agNumberCellEditor',
        },
        {
            field: 'gender',
            headerName: 'Provided Rich Select',
            cellRenderer: GenderRenderer,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellRenderer: GenderRenderer,
                values: ['Male', 'Female'],
            },
        },
        {
            field: 'mood',
            headerName: 'Custom Mood',
            cellRenderer: MoodRenderer,
            cellEditor: MoodEditor,
            cellEditorPopup: true,
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            flex: 1,
            minWidth: 100,
        };
    }, []);

    return <>
        <div className={"ag-theme-quartz grid-wrapper"}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            ></AgGridReact>
        </div >
    </>
}

export default CustomCellEditor;


