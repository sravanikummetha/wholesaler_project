import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const ReusableTable = ({
  columns,
  rows,
  pageSizeOptions = [5, 10, 15, 100],
  checkboxSelection = false,
  onRowDoubleClick,
}) => {
  return (
    <div className="table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        getRowId={(row) => row.id}
        checkboxSelection={checkboxSelection}
        onRowDoubleClick={onRowDoubleClick} // Capture double-click event
      />
    </div>
  );
};

export default ReusableTable;
