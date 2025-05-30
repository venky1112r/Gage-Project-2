// components/AddUserForm.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Paper
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddUserForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    erpId: "",
    email: "",
    role: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    // Add real logic here (e.g., API call)
    onBack(); // Return to table after submission
  };

  return (
    <Box p={3} component={Paper}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" ml={1}>
          New User Account
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{display:"flex", flexDirection:"column"}}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="First Name *"
            value={formData.firstName}
            onChange={handleChange("firstName")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Last Name *"
            value={formData.lastName}
            onChange={handleChange("lastName")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="User ID (ERP ID) *"
            value={formData.erpId}
            onChange={handleChange("erpId")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Email *"
            type="email"
            helperText="Email will be used for login"
            value={formData.email}
            onChange={handleChange("email")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            value={formData.role}
            onChange={handleChange("role")}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select user role
            </MenuItem>
            <MenuItem value="Administrator">Administrator</MenuItem>
            <MenuItem value="Plant Originator">Plant Originator</MenuItem>
            <MenuItem value="Merchandizer">Merchandizer</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onBack}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUserForm;
