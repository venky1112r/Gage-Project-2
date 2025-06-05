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
} from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

const BusinessRulesComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([
    {
      gradelevel: "National",
      civalue: "29.7",
      lastupdatedon: "01/01/2023",
      updatedby: "John Doe",
    },
    {
      gradelevel: "Retailer1",
      civalue: "30.00",
      lastupdatedon: "01/01/2023",
      updatedby: "John Doe",
    },
    {
      gradelevel: "Retailer2",
      civalue: "40.00",
      lastupdatedon: "01/01/2023",
      updatedby: "John Doe",
    },
  ]);

  const [editIdx, setEditIdx] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(rows[idx].civalue);
  };

  const handleSave = () => {
    const updatedRows = [...rows];
    updatedRows[editIdx].civalue = editValue;
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
            {paginatedRows.map((row, idx) => (
              <TableRow key={page * rowsPerPage + idx}>
                <TableCell>{row.gradelevel}</TableCell>
                <TableCell>
                  {editIdx === idx ? (
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
                  {editIdx === idx ? (
                    <>
                      <IconButton
                        color="primary"
                        onClick={handleSave}
                        size="small"
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
                      onClick={() => handleEdit(rows.indexOf(row))}
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
            ))}
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
