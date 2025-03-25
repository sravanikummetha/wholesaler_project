import React, { useEffect, useState } from "react";
import { Typography, Grid2, TextField } from "@mui/material";
import ReusableTable from "../common/reusableTable";
import ReusableButton from "../common/reusableButton";
import ReusableModal from "../common/reusableModal";
import DropdownMenu from "../common/dropdown/dropdownMenu";
import { columns } from "../../utils/Tabledata";
import * as XLSX from "xlsx";
import { getAllWholesalers, deleteWholesaler } from "../../services/wholesalerService";
import "./WholesalerTable.css";

const WholesalerTable = () => {
  const [wholesalers, setWholesalers] = useState([]);
  const [userRole, setUserRole] = useState("Customer");
  const [selectedRowIds, setSelectedRowIds] = useState([]); // Track selected checkboxes
  const [open, setOpen] = useState(false); // Modal state
  const [selectedWholesaler, setSelectedWholesaler] = useState(null); // Track selected wholesaler for update
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    email: "",
    phone: "",
    orders: "",
    revenue: "",
    creditLimit: "",
    warehouse: "",
    discount: "",
    rating: "",
  });
  // Validation State
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchWholesalers();
    // Get user role from session storage
    const role = sessionStorage.getItem("userRole") || "Customer";
    setUserRole(role);
  }, []);

  const fetchWholesalers = async () => {
    try {
      const data = await getAllWholesalers(); // Fetch all wholesalers
      const userEmail = sessionStorage.getItem("userEmail"); // Get logged-in user's email
      const userRole = sessionStorage.getItem("userRole"); // Get logged-in user's role
  
      const filteredData = userRole === "Admin" 
        ? data // Admin sees all data
        : data.filter((item) => item.email === userEmail); // Customer sees only their row
  
      const formattedData = filteredData.map((item, index) => ({
        id: index + 1,
        _id: item._id, // Ensure `id` exists for MUI DataGrid
        ...item,
      }));
  
      setWholesalers(formattedData);
    } catch (error) {
      console.error("Failed to fetch wholesalers:", error);
    }
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(wholesalers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Wholesalers");
    XLSX.writeFile(workbook, "wholesalers_data.xlsx");
  };
  
  // Handle input change in modal form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails
  
    try {
      let response;
      const adminEmail = sessionStorage.getItem("userEmail");
  
      const newWholesaler = { 
        ...formData, 
        addedBy: formData.email  // Assign the entered email for filtering later
      };
  
      if (selectedWholesaler) {
        response = await fetch(`http://localhost:5000/wholesaler/${selectedWholesaler._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWholesaler),
        });
      } else {
        response = await fetch("http://localhost:5000/wholesaler", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newWholesaler, addedBy: adminEmail }),
        });
      }
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      fetchWholesalers(); // Refresh table
      handleClose();
    } catch (error) {
      console.error("Failed to add/update wholesaler:", error);
    }
  };
  
  // Validation Function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.orders || formData.orders <= 0)
      newErrors.orders = "Orders must be a positive number";
    if (!formData.revenue || formData.revenue < 0)
      newErrors.revenue = "Revenue must be a positive number";
    if (!formData.creditLimit || formData.creditLimit < 0)
      newErrors.creditLimit = "Credit Limit must be positive";
    if (!formData.discount || formData.discount < 0 || formData.discount > 100)
      newErrors.discount = "Discount must be between 0-100";
    if (!formData.rating || formData.rating < 0 || formData.rating > 5)
      newErrors.rating = "Rating must be between 0-5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle row double-click to check the checkbox & enable delete button
  const handleRowDoubleClick = (row) => {
    setSelectedWholesaler(row); // Store selected row data
    setFormData({ ...row }); // Pre-fill the form with selected row data
    setOpen(true); // Open the modal for editing
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (id === "all") {
      // Check if all rows are already selected
      if (selectedRowIds.length === wholesalers.length) {
        setSelectedRowIds([]); // Uncheck all
      } else {
        setSelectedRowIds(wholesalers.map((wholesaler) => wholesaler._id)); // Select all
      }
    } else {
      // Toggle individual row selection
      setSelectedRowIds((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedRowIds.length) return;

    try {
      await Promise.all(selectedRowIds.map((id) => deleteWholesaler(id)));

      fetchWholesalers();
      // Remove deleted rows from state
      setWholesalers(wholesalers.filter((w) => !selectedRowIds.includes(w.id)));
      setSelectedRowIds([]); // Reset selection
    } catch (error) {
      console.error("Error deleting wholesalers:", error);
    }
  };

  // Admin approves checked rows
  const handleApprove = async () => {
    if (!selectedRowIds.length) return;

    try {
      // Update status in the database for selected wholesalers
      await Promise.all(
        selectedRowIds.map(async (id) => {
          const response = await fetch(
            `http://localhost:5000/wholesaler/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "Active" }),
            }
          );

          if (!response.ok) {
            throw new Error(`Error updating status for ${id}`);
          }
          fetchWholesalers();
        })
      );

      // Update the UI immediately after clicking Approve
      setWholesalers((prev) =>
        prev.map((wholesaler) =>
          selectedRowIds.includes(wholesaler.id)
            ? { ...wholesaler, status: "Active" } // Update status in state
            : wholesaler
        )
      );

      setSelectedRowIds([]); // Reset selection after approval
    } catch (error) {
      console.error("Error approving wholesalers:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectedRowIds.length === wholesalers.length) {
      setSelectedRowIds([]); // Unselect all if already selected
    } else {
      setSelectedRowIds(wholesalers.map((wholesaler) => wholesaler._id)); // Select all
    }
  };

  return (
    <div className="table-container">
      {/* Role display and action buttons BELOW Header */}
      <div className="actionContainer">
        <div className="leftActions">
          <Typography variant="h6" className="userRole">
            Logged in as: <strong>{userRole}</strong>
          </Typography>
          {/* Add Wholesaler Button */}
          {userRole === "Admin" && (
            <ReusableButton
              label="Add Wholesaler"
              onClick={() => setOpen(true)}
            />
          )}

          {userRole === "Admin" && (
            <ReusableButton
              label="Delete"
              onClick={handleDelete}
              disabled={selectedRowIds.length === 0}
            />
          )}
        </div>
        <div className="rightActions">
          {/* Approve Button */}
          {userRole === "Admin" && (
            <ReusableButton
              label="Approve"
              onClick={handleApprove}
              disabled={selectedRowIds.length === 0}
              className="approve-button"
            />
          )}

          <ReusableButton label="Export to CSV" onClick={exportToCSV} />
          {/* Dropdown for Role Selection */}
          <DropdownMenu options={["Admin", "Customer"]} onSelect={() => {}} />
        </div>
      </div>

      {/* Reusable Modal for Form */}
      <ReusableModal
        open={open}
        handleClose={handleClose}
        title={selectedWholesaler ? "Edit Wholesaler" : "Add New Wholesaler"}
        onSubmit={handleSubmit}
      >
        <Grid2 container spacing={2}>
          {[
            { label: "Name", name: "name" },
            { label: "Category", name: "category" },
            { label: "Location", name: "location" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Orders", name: "orders", type: "number" },
            { label: "Revenue", name: "revenue", type: "number" },
            { label: "Credit Limit", name: "creditLimit", type: "number" },
            { label: "Warehouse", name: "warehouse" },
            { label: "Discount (%)", name: "discount", type: "number" },
            { label: "Rating", name: "rating", type: "number", step: "0.1" },
          ].map((field) => (
            <Grid2 item xs={12} md={4} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={handleChange}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]}
                required
              />
            </Grid2>
          ))}
        </Grid2>
      </ReusableModal>
      <Typography variant="subtitle1" className="selctedRows">
        {selectedRowIds.length} {selectedRowIds.length === 1 ? "row" : "rows"}{" "}
        selected
      </Typography>
      <ReusableTable
        columns={[
          {
            field: "select",
            headerName: (
              <input
                type="checkbox"
                checked={
                  selectedRowIds.length === wholesalers.length &&
                  wholesalers.length > 0
                }
                onChange={() => handleSelectAll()}
              />
            ),
            width: 50,
            renderCell: (params) => (
              <input
                type="checkbox"
                // checked={selectedRowIds.includes(params.row._id)}
                checked={
                  selectedRowIds.findIndex(
                    (each) => each === params.row._id
                  ) !== -1
                }
                onChange={() => handleCheckboxChange(params.row._id)}
              />
            ),
          },
          ...columns, // Spread existing columns
        ]}
        rows={wholesalers}
        checkboxSelection={false} // No automatic checkboxes
        autoHeight // Makes table adjust to content height
        onRowDoubleClick={(params) => handleRowDoubleClick(params.row)} // Enable delete on double-click
      />
    </div>
  );
};

export default WholesalerTable;
