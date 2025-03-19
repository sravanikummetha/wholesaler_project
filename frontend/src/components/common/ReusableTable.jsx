import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const ReusableTable = ({
  columns,
  rows,
  checkboxSelection = false,
  onRowDoubleClick,
}) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5, // Default 5 rows per page
    page: 0,
  });

  return (
    <div className="table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 15, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row.id}
        checkboxSelection={checkboxSelection}
        onRowDoubleClick={onRowDoubleClick}
        disableSelectionOnClick
        sx={{
          "& .MuiDataGrid-selectedRowCount": { display: "none" }, // Hide 'X rows selected'
          "& .MuiDataGrid-footerContainer": { justifyContent: "flex-end" }, // Keep pagination on the right
          "& .MuiTablePagination-root": { justifyContent: "flex-end", width: "100%" }, // Ensures alignment stays right
        }}
      />
    </div>
  );
};

export default ReusableTable;
