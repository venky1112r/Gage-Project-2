import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ShowChart } from "@mui/icons-material";
import AddCustomerForm from "./AddCustomerForm";

const initialCustomers = [
  {
    id: "12345AG",
    name: "Clear Lake Energy",
    type: "Ethanol Company",
    source: "Internal",
    erp: "Agris",
    location: "Northeast +3 more",
    createdOn: "12/16/2024",
  },
  {
    id: "12345ACI",
    name: "Ethanol Pro",
    type: "Retailer",
    source: "External",
    erp: "n/a",
    location: "Ethanol Pro",
    createdOn: "12/16/2024",
  },
  {
    id: "EXT12345",
    name: "Energo",
    type: "Ethanol Company",
    source: "Internal",
    erp: "CINCH",
    location: "Energo",
    createdOn: "12/16/2024",
  },
  {
    id: "EXT12345",
    name: "EnergoOne",
    type: "Retailer",
    source: "Internal",
    erp: "CINCH",
    location: "EnergoOne",
    createdOn: "12/16/2024",
  },
];

const CustomersComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleResetPassword = async () => {
    console.log("selectedCustomer", selectedCustomer.id);
try {
    const res = await fetch("/api/reset-password-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId: selectedCustomer.id }),
    });

    if (res.ok) {
      alert(`Password reset email sent to ${selectedCustomer.name}`);
    } else {
      alert("Failed to send reset email.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
  handleMenuClose();
  };

  const handleDelete = () => {
    alert(`Delete ${selectedCustomer.name}`);
    handleMenuClose();
  };
  const customers = initialCustomers.filter(
    (c) =>
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.includes(search)) &&
      (typeFilter ? c.type === typeFilter : true) &&
      (sourceFilter ? c.source === sourceFilter : true)
  );
  return (
    <Box p={3}>
      {showForm ? (
        <AddCustomerForm onBack={() => setShowForm(false)}/>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              //    flexWrap: 'wrap'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Customer Accounts
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
              Add New Customer
            </Button>
          </Box>
          <Paper sx={{ mt: 3, p: 3, borderRadius: "10px" }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search customers by name or ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Select
                  fullWidth
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Filter by type</MenuItem>
                  <MenuItem value="Ethanol Company">Ethanol Company</MenuItem>
                  <MenuItem value="Retailer">Retailer</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Select
                  fullWidth
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Filter by source</MenuItem>
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="External">External</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>ERP</TableCell>
                    <TableCell>Plants / Locations</TableCell>
                    <TableCell>Created on</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.length > 0 ? (
                    customers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((cust, index) => (
                        <TableRow key={index}>
                          <TableCell>{cust.id}</TableCell>
                          <TableCell>{cust.name}</TableCell>
                          <TableCell>{cust.type}</TableCell>
                          <TableCell>{cust.source}</TableCell>
                          <TableCell>{cust.erp}</TableCell>
                          <TableCell>{cust.location}</TableCell>
                          <TableCell>{cust.createdOn}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={(e) => handleMenuOpen(e, cust)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No customers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination (static demo) */}
            <TablePagination
              component="div"
              count={customers.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25]}
              labelDisplayedRows={({ page }) => {
                const totalPages = Math.ceil(customers.length / rowsPerPage);
                return `Page ${page + 1} of ${totalPages} — ${
                  customers.length
                } record${customers.length !== 1 ? "s" : ""}`;
              }}
            />
          </Paper>
          {/* Three-dot menu actions */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleResetPassword}>Reset Password</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default CustomersComponent;
