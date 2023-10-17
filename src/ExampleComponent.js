import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise';
import { createRoot } from 'react-dom/client';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const App = ({ triggerQuery, model, modelUpdate }) => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(model.data);
  const [columnDefs, setColumnDefs] = useState(model.columns);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Entity Name',
      minWidth: 500,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);
  const getDataPath = useMemo(() => {
    return (data) => {
      return data.orgHierarchy;
    };
  }, []);
  const cellClickedListener = useCallback( event => {
      triggerQuery("setContainer")
      const selectedRows = event.data;
      modelUpdate(({ selectedRow: selectedRows }))
    }, []);
  // const onSelectionChanged = useCallback(() => {
  //   const selectedRows = gridRef.current.api.getSelectedRows();
  //   modelUpdate(({ selectedRow: selectedRows }))
  // }, []);

  // const onFilterTextBoxChanged = useCallback(() => {
  //   gridRef.current.api.setQuickFilter(
  //     document.getElementById('filter-text-box').value
  //   );
  // }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          {/* <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          /> */}
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            treeData={true}
            animateRows={true}
            groupDefaultExpanded={model.expanded}
            getDataPath={getDataPath}
            onCellDoubleClicked={cellClickedListener}
          />
        </div>
      </div>
    </div>
  );
  

};

export default App;




