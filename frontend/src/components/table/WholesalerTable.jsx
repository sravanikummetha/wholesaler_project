import React from "react";
import ReusableTable from "../common/reusableTable";
import { columns, rows } from "../../utils/Tabledata";

const WholesalerTable = () => {
    return <ReusableTable columns={columns} rows={rows} checkboxSelection={true} />;
};

export default WholesalerTable;
