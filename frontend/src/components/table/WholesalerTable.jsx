import React, { useEffect, useState } from "react";
import { Typography, Grid, TextField } from "@mui/material";
import ReusableTable from "../common/reusableTable";
import ReusableButton from "../common/reusableButton";
import ReusableModal from "../common/reusableModal";
import DropdownMenu from "../common/dropdown/dropdownMenu";
import { columns } from "../../utils/Tabledata";
import {getAllWholesalers, deleteWholesaler} from "../../services/wholesalerService";
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

  useEffect(() => {
    const fetchWholesalers = async () => {
      try {
        const data = await getAllWholesalers();
        const formattedData = data.map((item) => ({
          id: item._id,
          ...item,
        }));
        setWholesalers(formattedData);
      } catch (error) {
        console.error("Failed to fetch wholesalers:", error);
      }
    };

    fetchWholesalers();
    // Get user role from session storage
    const role = sessionStorage.getItem("userRole") || "Customer";
    setUserRole(role);
  }, []);

  // Handle input change in modal form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (selectedWholesaler) {
        // Update existing wholesaler (PATCH)
        response = await fetch(
          `http://localhost:5000/wholesaler/${selectedWholesaler.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // Add new wholesaler (POST)
        response = await fetch("http://localhost:5000/wholesaler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      // Update the table
      setWholesalers((prev) =>
        selectedWholesaler
          ? prev.map((w) => (w.id === selectedWholesaler.id ? result.data : w))
          : [...prev, result.data]
      );

      // Reset form and modal state
      setFormData({
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

      setSelectedWholesaler(null); // Clear selected wholesaler
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Failed to add/update wholesaler:", error);
    }
  };

  // Handle row double-click to check the checkbox & enable delete button
  const handleRowDoubleClick = (row) => {
    setSelectedWholesaler(row); // Store selected row data
    setFormData({ ...row }); // Pre-fill the form with selected row data
    setOpen(true); // Open the modal for editing
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter((rowId) => rowId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedRowIds.length) return;

    try {
      await Promise.all(selectedRowIds.map((id) => deleteWholesaler(id)));

      // Remove deleted rows from state
      setWholesalers(wholesalers.filter((w) => !selectedRowIds.includes(w.id)));
      setSelectedRowIds([]); // Reset selection
    } catch (error) {
      console.error("Error deleting wholesalers:", error);
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
          <ReusableButton
            label="Add Wholesaler"
            onClick={() => setOpen(true)}
          />

          {/* Delete Button (Enabled only when a checkbox is selected) */}
          <ReusableButton
            label="Delete"
            onClick={handleDelete}
            disabled={selectedRowIds.length === 0}
          />
        </div>
        <div className="rightActions">
          {/* Approve Button */}
          {userRole === "Admin" && (
            <ReusableButton
              label="Approve"
              onClick={() => alert("Approve clicked")}
            />
          )}

          {/* Dropdown for Role Selection */}
          <DropdownMenu options={["Admin", "Customer"]} onSelect={() => {}} />
        </div>
      </div>

      {/* Reusable Modal for Form */}
      <ReusableModal
        open={open}
        handleClose={() => {
          setSelectedWholesaler(null);
          setOpen(false);
        }}
        title={selectedWholesaler ? "Edit Wholesaler" : "Add New Wholesaler"}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Orders"
              name="orders"
              type="number"
              value={formData.orders}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Revenue"
              name="revenue"
              type="number"
              value={formData.revenue}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Credit Limit"
              name="creditLimit"
              type="number"
              value={formData.creditLimit}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Warehouse"
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Discount (%)"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Rating"
              name="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
      </ReusableModal>

      <ReusableTable
        columns={[
          {
            field: "select",
            headerName: "",
            width: 50,
            renderCell: (params) => (
              <input
                type="checkbox"
                checked={selectedRowIds.includes(params.row.id)}
                onChange={() => handleCheckboxChange(params.row.id)}
              />
            ),
          },
          ...columns, // Spread existing columns
        ]}
        rows={wholesalers}
        checkboxSelection={false} // No automatic checkboxes
        onRowDoubleClick={(params) => handleRowDoubleClick(params.row)} // Enable delete on double-click
      />
    </div>
  );
};

export default WholesalerTable;
