import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import { saveManualInput } from "../services/api.js";

const ManualInputsComponent = () => {
  const { manualInputs, loadManualInputs } = useDashboard();
  const [loading, setLoading] = useState(false);
  console.log("manualInputs", manualInputs);

  // ✅ Load manual input data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await loadManualInputs(); // Loads and updates context
      } catch (error) {
        console.error("Error loading manual inputs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // ✅ Update local state when manualInputs from context is ready
  useEffect(() => {
    if (manualInputs && manualInputs.length > 0) {
      const formatted = manualInputs.map((row) => ({
        ...row,
        createdate: row.createdate
          ? new Date(row.createdate).toISOString().split("T")[0]
          : "",
        updateddate: row.updateddate
          ? new Date(row.updateddate).toISOString().split("T")[0]
          : "",
      }));
      setRows(formatted);
    }
  }, [manualInputs]);

  const location = useLocation();
  const email = location.state?.email || "guest@example.com"; // ✅ use email for updatedby
  const [rows, setRows] = useState([]);
  console.log("after use effect rows", rows);
  // const [rows, setRows] = useState([
  //   {
  //     createdate: "2025-04-01",
  //     updateddate: "2025-04-30",
  //     fossilgasused: "12.5",
  //     coalusage: "3.2",
  //     gridelectricusage: "4.1",
  //     renewablelectricusage: "1.3",
  //     naturalgasrenewable45z: "1.3",
  //     totalbushelsprocessed: "1350000",
  //     totalethanolproduced: "42.8",
  //     updatedon: "05/10/2025",
  //     updatedby: "Alice Johnson",
  //   },
  //   {
  //     createdate: "2025-03-01",
  //     updateddate: "2025-03-31",
  //     fossilgasused: "11.9",
  //     coalusage: "2.8",
  //     gridelectricusage: "3.9",
  //     renewablelectricusage: "1.1",
  //      naturalgasrenewable45z: "1.3",
  //     totalbushelsprocessed: "1280000",
  //     totalethanolproduced: "40.2",
  //     updatedon: "04/09/2025",
  //     updatedby: "Bob Smith",
  //   },
  //   {
  //     createdate: "2025-02-01",
  //     updateddate: "2025-02-28",
  //     fossilgasused: "13.1",
  //     coalusage: "3.5",
  //     gridelectricusage: "4.3",
  //     renewablelectricusage: "1.4",
  //      naturalgasrenewable45z: "1.3",
  //     totalbushelsprocessed: "1400000",
  //     totalethanolproduced: "44.0",
  //     updatedon: "03/07/2025",
  //     updatedby: "Clara Lee",
  //   },
  //   {
  //     createdate: "2025-02-01",
  //     updateddate: "2025-02-28",
  //     fossilgasused: "13.1",
  //     coalusage: "3.5",
  //     gridelectricusage: "4.3",
  //     renewablelectricusage: "1.4",
  //      naturalgasrenewable45z: "1.3",
  //     totalbushelsprocessed: "1400000",
  //     totalethanolproduced: "44.0",
  //     updatedon: "03/07/2025",
  //     updatedby: "Clara Lee",
  //   },
  //   {
  //     createdate: "2025-03-01",
  //     updateddate: "2025-03-31",
  //     fossilgasused: "11.9",
  //     coalusage: "2.8",
  //     gridelectricusage: "3.9",
  //     renewablelectricusage: "1.1",
  //      naturalgasrenewable45z: "1.3",
  //     totalbushelsprocessed: "1280000",
  //     totalethanolproduced: "40.2",
  //     updatedon: "04/09/2025",
  //     updatedby: "Bob Smith",
  //   },
  //   {
  //     createdate: "2025-03-01",
  //     updateddate: "2025-03-31",
  //     fossilgasused: "11.9",
  //     coalusage: "2.8",
  //     gridelectricusage: "3.9",
  //     renewablelectricusage: "1.1",
  //      naturalgasrenewable45z: "1.3",
  //     totalbushelsprocessed: "1280000",
  //     totalethanolproduced: "40.2",
  //     updatedon: "04/09/2025",
  //     updatedby: "Bob Smith",
  //   },
  //   {
  //     createdate: "2025-02-01",
  //     updateddate: "2025-02-28",
  //     fossilgasused: "13.1",
  //     coalusage: "3.5",
  //     gridelectricusage: "4.3",
  //     renewablelectricusage: "1.4",
  //      naturalgasrenewable45z: "1.3",
  //     totalbushelsprocessed: "1400000",
  //     totalethanolproduced: "44.0",
  //     updatedon: "03/07/2025",
  //     updatedby: "Clara Lee",
  //   },
  // ]);

  const [formData, setFormData] = useState({
    createdate: "",
    updateddate: "",
    fossilgasused: "",
    coalusage: "",
    gridelectricusage: "",
    renewablelectricusage: "",
    naturalgasrenewable45z: "",
    totalbushelsprocessed: "",
    totalethanolproduced: "",
    convefficiency: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const requiredFields = [
    "createdate",
    "updateddate",
    "fossilgasused",
    "coalusage",
    "gridelectricusage",
    "renewablelectricusage",
    "naturalgasrenewable45z",
    "totalbushelsprocessed",
    "totalethanolproduced",
  ];

  const numberFields = [
    "fossilgasused",
    "coalusage",
    "gridelectricusage",
    "renewablelectricusage",
    "naturalgasrenewable45z",
    "totalbushelsprocessed",
    "totalethanolproduced",
    "convefficiency",
  ];

  const handleSave = async () => {
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
      plantid: 1001, // <-- You need to pass a valid plant ID
      fossilgasused: Number(formData.fossilgasused),
      coalusage: Number(formData.coalusage),
      gridelectricusage: Number(formData.gridelectricusage),
      renewablelectricusage: Number(formData.renewablelectricusage),
      naturalgasrenewable45z: Number(formData.naturalgasrenewable45z),
      totalbushelsprocessed: Number(formData.totalbushelsprocessed),
      totalethanolproduced: Number(formData.totalethanolproduced),
      convefficiency: formData.convefficiency
        ? Number(formData.convefficiency)
        : undefined,

      updatedby: email,
      updatedon: new Date().toISOString().split("T")[0], // "2025-06-02T09:30:00.000Z"
    };
    console.log("newRow", newRow);
    console.log("Sending to API:", JSON.stringify(newRow, null, 2));

    try {
      await saveManualInput(newRow); // ✅ API call
      setRows((prev) => [newRow, ...prev]);
      clearForm();
    } catch (err) {
      console.error("Error saving data:", err.message);
      alert("Failed to save data: " + err.message);
    }
  };

  const clearForm = () => {
    setFormData({
      createdate: "",
      updateddate: "",
      fossilgasused: "",
      coalusage: "",
      gridelectricusage: "",
      renewablelectricusage: "",
      naturalgasrenewable45z: "",
      totalbushelsprocessed: "",
      totalethanolproduced: "",
      convefficiency: "",
    });
    setFormErrors({});
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const fields = [
    { label: "From Date", field: "createdate", type: "date", unit: "" },
    { label: "To Date", field: "updateddate", type: "date", unit: "" },
    {
      label: "Fossil Natural Gas (NG)",
      field: "fossilgasused",
      type: "number",
      unit: "Thousand MMBTU",
    },
    {
      label: "Coal Usage (CL)",
      field: "coalusage",
      type: "number",
      unit: "Short tons",
    },
    {
      label: "Grid Electricity Usage (GE)",
      field: "gridelectricusage",
      type: "number",
      unit: "Million kWh",
    },
    {
      label: "Renewable Electricity Usage (RE)",
      field: "renewablelectricusage",
      type: "number",
      unit: "Million kWh",
    },
    {
      label: "Natural Gas Renewable - 45z",
      field: "naturalgasrenewable45z",
      type: "number",
      unit: "MMBtu",
    },
    {
      label: "Total Bushels Processed",
      field: "totalbushelsprocessed",
      type: "number",
      unit: "BU",
    },
    {
      label: "Total Ethanol Produced",
      field: "totalethanolproduced",
      type: "number",
      unit: "Million Gallons",
    },
    {
      label: "Conversion Efficiency",
      field: "convefficiency",
      type: "number",
      unit: "",
    },
  ];
  const handledownloadtemplate = () => {
    const csvContent = `producer_id,verdova_org_id,fmid_co_name,fmid_first_name,fmid_middle_name,fmid_last_name,fmid_addr_1,fmid_addr_2,fmid_city,fmid_ste_cd,fmid_zip_cd,fmid_ein_cd,fmid_county,latitude,longitude,crop_year,ci_score_provisional_gc02e_per_MJ,ci_score_provisional_gc02e_per_bu,ci_score_provisional_reduction_percent,ci_score_provisional_date,ci_score_final_gc02e_per_MJ,ci_score_final_gc02e_per_bu,ci_score_final_reduction_percent,ci_score_final_date,ci_score_parameter,ci_score_parameter_units,status,error`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
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
          <TableHead sx={{ "& th": { textAlign: "center" } }}>
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
          <TableBody sx={{ "& td": { textAlign: "center" } }}>
            {loading ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                    <TableCell>{row.createdate}</TableCell>
                    <TableCell>{row.updateddate}</TableCell>
                    <TableCell>{row.fossilgasused}</TableCell>
                    <TableCell>{row.coalusage}</TableCell>
                    <TableCell>{row.gridelectricusage}</TableCell>
                    <TableCell>{row.renewablelectricusage}</TableCell>
                    <TableCell>{row.naturalgasrenewable45z}</TableCell>
                    <TableCell>{row.totalbushelsprocessed}</TableCell>
                    <TableCell>{row.totalethanolproduced}</TableCell>
                    <TableCell>{row.updatedon}</TableCell>
                    <TableCell>{row.updatedby}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
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
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          showFirstButton={true}
          showLastButton={true}
          labelDisplayedRows={({ page }) => {
            const totalPages = Math.ceil(rows.length / rowsPerPage);
            return `Page ${page + 1} of ${totalPages} — ${rows.length} record${
              rows.length !== 1 ? "s" : ""
            }`;
          }}
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            display: "flex",
            gap: 1,
            fontSize: { xs: "12px", sm: "14px" },
            ".MuiTablePagination-toolbar": {
              flexWrap: "wrap",
              justifyContent: "center",
            },
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                margin: { xs: "4px 0", sm: "0" },
              },
          }}
        />
      </Box>
      <Box mt={4}>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Operational Net CI Score
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2, color: "#000000", borderColor: "#000000" }}
        >
          Upload Operational CI Score File
        </Button>
        <Typography
          variant="body2"
          onClick={handledownloadtemplate}
          sx={{
            mt: 1,
            color: "text.link",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Download Template
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          File format: .csv file (5MB max)
        </Typography>
      </Box>
    </Box>
  );
};

export default ManualInputsComponent;
