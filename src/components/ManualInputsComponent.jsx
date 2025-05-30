import React, { useState } from "react";
import { useLocation,  } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Grid,
  InputAdornment,
} from "@mui/material";

const ManualInputsComponent = () => {
  const location = useLocation();
  const email = location.state?.email || "guest@example.com"; // ✅ use email for updatedby

  const [rows, setRows] = useState([
    {
      from_date: "2025-04-01",
      to_date: "2025-04-30",
      fossil_Natural_Gas: "12.5",
      coal_Usage: "3.2",
      grid_Electricity_Usage: "4.1",
      renewable_Electricity_Usage: "1.3",
      natural_gas_renewable: "1.3",
      bushels_processed: "1350000",
      ethanol_produced: "42.8",
      lastupdatedon: "05/10/2025",
      updatedby: "Alice Johnson",
    },
    {
      from_date: "2025-03-01",
      to_date: "2025-03-31",
      fossil_Natural_Gas: "11.9",
      coal_Usage: "2.8",
      grid_Electricity_Usage: "3.9",
      renewable_Electricity_Usage: "1.1",
       natural_gas_renewable: "1.3",
      bushels_processed: "1280000",
      ethanol_produced: "40.2",
      lastupdatedon: "04/09/2025",
      updatedby: "Bob Smith",
    },
    {
      from_date: "2025-02-01",
      to_date: "2025-02-28",
      fossil_Natural_Gas: "13.1",
      coal_Usage: "3.5",
      grid_Electricity_Usage: "4.3",
      renewable_Electricity_Usage: "1.4",
       natural_gas_renewable: "1.3",
      bushels_processed: "1400000",
      ethanol_produced: "44.0",
      lastupdatedon: "03/07/2025",
      updatedby: "Clara Lee",
    },
    {
      from_date: "2025-02-01",
      to_date: "2025-02-28",
      fossil_Natural_Gas: "13.1",
      coal_Usage: "3.5",
      grid_Electricity_Usage: "4.3",
      renewable_Electricity_Usage: "1.4",
       natural_gas_renewable: "1.3",
      bushels_processed: "1400000",
      ethanol_produced: "44.0",
      lastupdatedon: "03/07/2025",
      updatedby: "Clara Lee",
    },
    {
      from_date: "2025-03-01",
      to_date: "2025-03-31",
      fossil_Natural_Gas: "11.9",
      coal_Usage: "2.8",
      grid_Electricity_Usage: "3.9",
      renewable_Electricity_Usage: "1.1",
       natural_gas_renewable: "1.3",
      bushels_processed: "1280000",
      ethanol_produced: "40.2",
      lastupdatedon: "04/09/2025",
      updatedby: "Bob Smith",
    },
    {
      from_date: "2025-03-01",
      to_date: "2025-03-31",
      fossil_Natural_Gas: "11.9",
      coal_Usage: "2.8",
      grid_Electricity_Usage: "3.9",
      renewable_Electricity_Usage: "1.1",
       natural_gas_renewable: "1.3",
      bushels_processed: "1280000",
      ethanol_produced: "40.2",
      lastupdatedon: "04/09/2025",
      updatedby: "Bob Smith",
    },
    {
      from_date: "2025-02-01",
      to_date: "2025-02-28",
      fossil_Natural_Gas: "13.1",
      coal_Usage: "3.5",
      grid_Electricity_Usage: "4.3",
      renewable_Electricity_Usage: "1.4",
       natural_gas_renewable: "1.3",
      bushels_processed: "1400000",
      ethanol_produced: "44.0",
      lastupdatedon: "03/07/2025",
      updatedby: "Clara Lee",
    },
  ]);

  const [formData, setFormData] = useState({
    from_date: "",
    to_date: "",
    fossil_Natural_Gas: "",
    coal_Usage: "",
    grid_Electricity_Usage: "",
    renewable_Electricity_Usage: "",
    natural_gas_renewable: "",
    bushels_processed: "",
    ethanol_produced: "",
    conversion_efficiency: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const requiredFields = [
    "from_date",
    "to_date",
    "fossil_Natural_Gas",
    "coal_Usage",
    "grid_Electricity_Usage",
    "renewable_Electricity_Usage",
    "natural_gas_renewable",
    "bushels_processed",
    "ethanol_produced",
  ];

  const numberFields = [
    "fossil_Natural_Gas",
    "coal_Usage",
    "grid_Electricity_Usage",
    "renewable_Electricity_Usage",
    "natural_gas_renewable",
    "bushels_processed",
    "ethanol_produced",
    "conversion_efficiency",
  ];

  const handleSave = () => {
    const errors = {};
    for (const field of requiredFields) {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    }
    for (const field of numberFields) {
      const value = formData[field];
      if (value && isNaN(Number(value))) {
        errors[field] = "Must be a number";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newRow = {
      ...formData,
      updatedby: email, // ✅ Corrected: use logged-in email
      lastupdatedon: new Date().toLocaleDateString(),
    };

    setRows((prev) => [newRow, ...prev]);
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      from_date: "",
      to_date: "",
      fossil_Natural_Gas: "",
      coal_Usage: "",
      grid_Electricity_Usage: "",
      renewable_Electricity_Usage: "",
      natural_gas_renewable: "",
      bushels_processed: "",
      ethanol_produced: "",
      conversion_efficiency: "",
    });
    setFormErrors({});
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const fields = [
    { label: "From Date", field: "from_date", type: "date", unit: "" },
    { label: "To Date", field: "to_date", type: "date", unit: "" },
    { label: "Fossil Natural Gas (NG)", field: "fossil_Natural_Gas", type: "number", unit: "Thousand MMBTU" },
    { label: "Coal Usage (CL)", field: "coal_Usage", type: "number", unit: "Short tons" },
    { label: "Grid Electricity Usage (GE)", field: "grid_Electricity_Usage", type: "number", unit: "Million kWh" },
    { label: "Renewable Electricity Usage (RE)", field: "renewable_Electricity_Usage", type: "number", unit: "Million kWh" },
    { label: "Natural Gas Renewable - 45z", field: "natural_gas_renewable", type: "number", unit: "MMBtu" },
    { label: "Total Bushels Processed", field: "bushels_processed", type: "number", unit: "BU" },
    { label: "Total Ethanol Produced", field: "ethanol_produced", type: "number", unit: "Million Gallons" },
    { label: "Conversion Efficiency", field: "conversion_efficiency", type: "number", unit: "" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Plant Operational Details
      </Typography>

      {fields.map((item) => (
        <Grid
          container
          spacing={2}
          alignItems="center"
          key={item.field}
          sx={{ mb: 1 }}
        >
          <Grid item xs={5} sm={3}>
            <Typography variant="body2">{item.label}</Typography>
          </Grid>
          <Grid item xs={7} sm={4}>
            <TextField
              type={item.type || "text"}
              fullWidth
              size="small"
              value={formData[item.field]}
              onChange={(e) => handleChange(item.field, e.target.value)}
              error={Boolean(formErrors[item.field])}
              helperText={formErrors[item.field]}
              InputLabelProps={item.type === "date" ? { shrink: true } : {}}
              InputProps={{
                endAdornment: item.unit ? (
                  <InputAdornment position="end">
                    <Typography
                      sx={{ fontSize: "14px", color: "text.secondary" }}
                    >
                      {item.unit}
                    </Typography>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Grid>
        </Grid>
      ))}

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" color="primary" onClick={clearForm}>
          Clear
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table size="small">
          <TableHead sx={{ "& th": { textAlign: "center"}} }>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>From Date</TableCell>
              <TableCell>To Date</TableCell>
              <TableCell>Fossil Natural Gas</TableCell>
              <TableCell>Coal Usage</TableCell>
              <TableCell>Grid Electricity Usage</TableCell>
              <TableCell>Renewable Electricity Usage</TableCell>
              <TableCell>Natural Gas Renewable - 45z</TableCell>
              <TableCell>Bushels Processed</TableCell>
              <TableCell>Total Ethanol Produced</TableCell>
              <TableCell>Updated On</TableCell>
              <TableCell>Updated By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ "& td": { textAlign: "center"} }}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow key={idx} >
                  <TableCell  >{page * rowsPerPage + idx + 1}</TableCell>
                  <TableCell>{row.from_date}</TableCell>
                  <TableCell>{row.to_date}</TableCell>
                  <TableCell>{row.fossil_Natural_Gas}</TableCell>
                  <TableCell>{row.coal_Usage}</TableCell>
                  <TableCell>{row.grid_Electricity_Usage}</TableCell>
                  <TableCell>{row.renewable_Electricity_Usage}</TableCell>
                  <TableCell>{row.natural_gas_renewable}</TableCell>
                  <TableCell>{row.bushels_processed}</TableCell>
                  <TableCell>{row.ethanol_produced}</TableCell>
                  <TableCell>{row.lastupdatedon}</TableCell>
                  <TableCell>{row.updatedby}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
            {/* <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count} row${count !== 1 ? 's' : ''}`
        }
      /> */}


      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        labelDisplayedRows={({ page }) => {
          const totalPages = Math.ceil(rows.length / rowsPerPage);
          return `Page ${page + 1} of ${totalPages} — ${rows.length} record${
            rows.length !== 1 ? "s" : ""
          }`;
        }}
      />
        <Box mt={4}>
                <Typography variant="h6" sx={{ mt: 2 }} >
                 Operational Net CI Score 
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2, color: '#000000', borderColor: '#000000' }} >Upload Operational CI Score File</Button>
                  <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>File format: .csv file (5MB max)</Typography>
              </Box>
    </Box>
  );
};

export default ManualInputsComponent;



    