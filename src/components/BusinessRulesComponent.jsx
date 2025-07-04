import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  IconButton,
  TextField,
  InputBase,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import { saveBusinessRules } from "../services/api";

const BusinessRulesComponent = () => {
  const location = useLocation();
  const { businessRules, loadBusinessRules } = useDashboard();
  const user = location.state?.email || "guest@example.com";
  const [rows, setRows] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const [originalValue, setOriginalValue] = useState("");

  console.log("businessRules", businessRules);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (
          !businessRules ||
          businessRules.length === 0 ||
          businessRules === null
        ) {
          await loadBusinessRules(); // Loads and updates context
        }
      } catch (error) {
        console.error("Error loading business rules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // const [rows, setRows] = useState([

  //   {
  //     gradelevel: "National",
  //     civalue: "29.7",
  //     lastupdatedon: "01/01/2023",
  //     updatedby: "John Doe",
  //   },
  //   {
  //     gradelevel: "Retailer1",
  //     civalue: "30.00",
  //     lastupdatedon: "01/01/2023",
  //     updatedby: "John Doe",
  //   },
  //   {
  //     gradelevel: "Retailer2",
  //     civalue: "40.00",
  //     lastupdatedon: "01/01/2023",
  //     updatedby: "John Doe",
  //   },
  // ]);
  useEffect(() => {
    if (businessRules && businessRules.length > 0) {
      const manualRow = {
  gradelevel: "National",
  civalue: "29.7",
  lastupdatedon: "-",
  updatedby: user || "-",
};
      const formattedRows = [
  manualRow,
  ...businessRules.map((rule) => ({
    gradelevel: rule.Name || "-",
    civalue: rule.ci_score || "-",
    lastupdatedon: "-",
    updatedby:  "-",
  })),
];
      setRows(formattedRows);
    }
  }, [businessRules]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (idx) => {
     const currentValue = rows[page * rowsPerPage + idx].civalue;
    setEditIdx(idx);
    // setEditValue(rows[idx].civalue);
    setEditValue(currentValue !== "-" ? currentValue : "");
     setOriginalValue(currentValue !== "-" ? currentValue : "");


  setOriginalValue(currentValue !== "-" ? currentValue : "");
  };

const handleSave = async () => {
  console.log("editIdx", editIdx);
  const globalIdx = editIdx;
  const updatedRows = [...rows];
  const updatedRow = {
    ...updatedRows[globalIdx],
    civalue: editValue || "-",
    lastupdatedon: new Date().toLocaleDateString(),
    updatedby: user || "-",
  };

  updatedRows[globalIdx] = updatedRow;

  try {
    await saveBusinessRules([updatedRow]); // Send only updated row
    console.log("Updated business rule:", updatedRow);
  } catch (error) {
    console.error("Error saving business rule:", error);
  }

  setRows(updatedRows);
  setEditIdx(-1);
  setEditValue("");
};


  const handleCancel = () => {
    setEditIdx(-1);
    setEditValue("");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredRows = rows.filter((row) =>
    row.gradelevel.toLowerCase().includes(searchText)
  );
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        CI Score Averages
      </Typography>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          maxWidth: 300,
          border: "1px solid #9EA9A3",
          borderRadius: "6px",
        }}
      >
        <SearchIcon sx={{ mr: 1 }} />
        <InputBase
          placeholder="Search Grade Level"
          fullWidth
          onChange={handleSearch}
          value={searchText}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ "& th": { fontWeight: "bold" } }}>
            <TableRow>
              <TableCell>Grade Level</TableCell>
              <TableCell>CI Value</TableCell>
              <TableCell>Last Updated On</TableCell>
              <TableCell>Updated By</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedRows.length > 0 ? (
              paginatedRows.map((row, idx) => (
                <TableRow key={page * rowsPerPage + idx}>
                  <TableCell>{row.gradelevel}</TableCell>
                  <TableCell>
                    {editIdx === page * rowsPerPage + idx ? (
                      <TextField
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        type="number"
                        inputProps={{ step: "0.1" }}
                      />
                    ) : (
                      row.civalue
                    )}
                  </TableCell>
                  <TableCell>{row.lastupdatedon}</TableCell>
                  <TableCell>{row.updatedby}</TableCell>
                  <TableCell align="center">
                    {editIdx === page * rowsPerPage + idx ? (
                      <>
                        <IconButton
                          color="primary"
                          onClick={handleSave}
                          size="small"
                          disabled={editValue === originalValue}
                        >
                          <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={handleCancel}
                          size="small"
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(page * rowsPerPage + idx)}
                        size="small"
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ color: "#000000" }}
                          fontSize="small"
                        />
                      </IconButton>
                    )}
                  </TableCell>
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
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton={true}
        showLastButton={true}
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

      <Box mt={4}>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Heat Maps Averages (Country/State)
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2, color: "#000000", borderColor: "#000000" }}
          disabled
        >
          Upload DTN File
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

export default BusinessRulesComponent;
