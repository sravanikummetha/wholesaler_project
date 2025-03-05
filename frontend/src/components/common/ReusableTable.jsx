import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const ReusableTable = ({
  columns,
  rows,
  pageSizeOptions = [5, 10, 15],
  checkboxSelection = false,
}) => {
  return (
    <div className="table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        getRowId={(row) => row.id}
        checkboxSelection={checkboxSelection}
      />
    </div>
  );
};

export default ReusableTable;
