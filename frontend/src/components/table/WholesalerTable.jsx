import React from "react";
import ReusableTable from "../common/ReusableTable";
import { columns, rows } from "../../utils/Tabledata";

const WholesalerTable = () => {
    return <ReusableTable columns={columns} rows={rows} checkboxSelection={true} />;
};

export default WholesalerTable;
