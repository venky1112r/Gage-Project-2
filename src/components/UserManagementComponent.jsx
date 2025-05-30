import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import AddUserForm from "./AddUserForm";
// Mock data
const initialUsers = [
  {
    id: "123",
    name: "Adrian Whitley",
    email: "awhitley@newenergy.com",
    customer: "New Energy",
    role: "Administrator",
    createdOn: "03/13/2025",
    lastModified: "03/13/2025",
  },
  {
    id: "122",
    name: "Anna Patterson",
    email: "apatterson@cle.com",
    customer: "Clear Lake Energy",
    role: "Plant Originator",
    createdOn: "12/16/2024",
    lastModified: "12/16/2024",
  },
  {
    id: "121",
    name: "Jack Stone",
    email: "jackstone@ep.com",
    customer: "Ethanol Pro",
    role: "Plant Originator",
    createdOn: "12/16/2024",
    lastModified: "12/16/2024",
  },
  {
    id: "120",
    name: "Jenniffer Sparrow",
    email: "jsparrow@energoone.com",
    customer: "EnergoOne",
    role: "Administrator",
    createdOn: "12/16/2024",
    lastModified: "12/16/2024",
  },
  {
    id: "119",
    name: "John Doe",
    email: "johndoe@energo.com",
    customer: "Energo",
    role: "Merchandizer",
    createdOn: "12/16/2024",
    lastModified: "12/16/2024",
  },
];

const UserManagementComponent = (props) => {
  const location = useLocation();
  const userrole = location.state?.userrole || props.userrole || "guest";
  const userCustomer = location.state?.customer || props.customer || "";

  const isGadmin = userrole === "gadmin";

  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter logic based on role
  const filteredUsers = initialUsers
    .filter((user) => (isGadmin ? true : user.customer === userCustomer))
    .filter(
      (u) =>
        (u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.id.includes(search)) &&
        (isGadmin && typeFilter ? u.customer === typeFilter : true) &&
        (sourceFilter ? u.role === sourceFilter : true)
    );

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

  const handleResetPassword = () => {
    alert(`Reset password for ${selectedCustomer.name}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    alert(`Delete ${selectedCustomer.name}`);
    handleMenuClose();
  };

  return (
    <Box p={3}>
      {showForm ? (
        <AddUserForm onBack={() => setShowForm(false)} />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">User Management</Typography>
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
              Add New User
            </Button>
          </Box>

          <Paper sx={{ mt: 3, p: 3, borderRadius: "10px" }}>
            <Grid container spacing={2} alignItems="center" mb={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search users by name or ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              {isGadmin && (
                <Grid item xs={6} sm={3}>
                  <Select
                    fullWidth
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">Filter by customer</MenuItem>
                    <MenuItem value="New Energy">New Energy</MenuItem>
                    <MenuItem value="Clear Lake Energy">Clear Lake Energy</MenuItem>
                    <MenuItem value="Ethanol Pro">Ethanol Pro</MenuItem>
                    <MenuItem value="EnergoOne">EnergoOne</MenuItem>
                    <MenuItem value="Energo">Energo</MenuItem>
                  </Select>
                </Grid>
              )}
              <Grid item xs={6} sm={3}>
                <Select
                  fullWidth
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Filter by role</MenuItem>
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Plant Originator">Plant Originator</MenuItem>
                  <MenuItem value="Merchandizer">Merchandizer</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    {isGadmin && <TableCell>Customer</TableCell>}
                    <TableCell>Role</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Last Modified</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user, index) => (
                        <TableRow key={index}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          {isGadmin && <TableCell>{user.customer}</TableCell>}
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.createdOn}</TableCell>
                          <TableCell>{user.lastModified}</TableCell>
                          <TableCell align="right">
                            <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={isGadmin ? 8 : 7} align="center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25]}
              labelDisplayedRows={({ page }) => {
                const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
                return `Page ${page + 1} of ${totalPages} — ${filteredUsers.length} record${
                  filteredUsers.length !== 1 ? "s" : ""
                }`;
              }}
            />
          </Paper>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleResetPassword}>Reset Password</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default UserManagementComponent;
