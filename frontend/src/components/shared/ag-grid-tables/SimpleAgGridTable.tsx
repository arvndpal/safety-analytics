// @ts-nocheck
import { useState, useEffect, useLayoutEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { useSelector } from 'react-redux';

const SimpleAgGridTable = (props) => {
  const { sidebar } = useSelector((state: any) => state.toggle);
  const { rowData = [], colDefs = [], frameworkComponents } = props;

  const [gridApi, setGridApi] = useState(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi, size, sidebar]);

  const handleGridReady = (event: GridReadyEvent) => {
    setGridApi(event.api);
  };

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <AgGridReact
      onGridReady={handleGridReady}
      rowData={rowData}
      columnDefs={colDefs}
      frameworkComponents={frameworkComponents}
      pagination={true}
      paginationPageSize={10}
      paginationPageSizeSelector={[5, 10, 20, 50]}
    />
  );
};
export default SimpleAgGridTable;
