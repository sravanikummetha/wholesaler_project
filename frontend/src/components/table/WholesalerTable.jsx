import React, { useEffect, useState } from "react";
import ReusableTable from "../common/reusableTable";
import { columns } from "../../utils/Tabledata";
import { getAllWholesalers } from "../../services/wholesalerService";

const WholesalerTable = () => {
  const [wholesalers, setWholesalers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWholesalers = async () => {
      try {
        const data = await getAllWholesalers();

        // Assign a unique sequential `id` before passing data to the table
        const formattedData = data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));

        setWholesalers(formattedData);
      } catch (error) {
        console.error("Failed to fetch wholesalers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWholesalers();
  }, []);

  return (
    <div>
      <ReusableTable
        columns={columns}
        rows={wholesalers}
        checkboxSelection={true}
      />
    </div>
  );
};

export default WholesalerTable;
