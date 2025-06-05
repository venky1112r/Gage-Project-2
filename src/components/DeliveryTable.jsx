import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";

const DeliveryTable = ({ plantTableData }) => {
  
  const [rows, setRows] = useState([
    { plant: "Clear Lake Energy Northeast", totalCapacity: "30%", grower: "28.47%", retailer: "27.75%", national: "4.53%", custom: "-", noScoreGrower: "-", noScoreRetailer: "-", total: "60.75%" },
    { plant: "Clear Lake Energy Northwest", totalCapacity: "64%", grower: "2.42%", retailer: "3.22%", national: "4.36%", custom: "1.41%", noScoreGrower: "-", noScoreRetailer: "-", total: "11.41%" },
    { plant: "Clear Lake Energy Southeast", totalCapacity: "", grower: "", retailer: "1.74%", national: "6.68%", custom: "-", noScoreGrower: "-", noScoreRetailer: "-", total: "8.43%" },
    { plant: "Clear Lake Energy Southwest", totalCapacity: "78%", grower: "", retailer: "8.11%", national: "", custom: "9.8%", noScoreGrower: "1.46%", noScoreRetailer: "-", total: "19.42%" },
    { plant: "Total by Grade Level", totalCapacity: "58%", grower: "30.88%", retailer: "40.88%", national: "15.57", custom: "11.21%", noScoreGrower: "1.46%", noScoreRetailer: "-", total: "100%" },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleAddClick = () => setOpen(true);

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedPlant("");
    setNewQuantity("");
  };

const handleSave = () => {
  if (!selectedPlant || !newQuantity) return;

  const updatedRows = rows.map((row) => {
    if (row.plant === selectedPlant) {
      return {
        ...row,
        totalCapacity: `${parseFloat(newQuantity).toFixed(2)}%`,
      };
    }
    return row;
  });

  setRows(updatedRows);
  handleClose();
};
 const calculateTotal = (row) => {
    const total = [
      row.grower_percentage,
      row.retailer_percentage,
      row.other_percentage,
      row.no_score_grower_percentage,
      row.no_score_retailer_percentage,
    ]
      .map((val) => parseFloat(val) || 0)
      .reduce((sum, val) => sum + val, 0);
    return total.toFixed(2) + "%";
  };

  return (
          <Paper elevation={2} sx={{ borderRadius: 4, p: 2,  width: "100%", height:'100%' }}>
    {/* <Box mt={1} sx={{ mt: 0 }}> */}
        {/* <Box display="flex" justifyContent="space-between" mt={1}> */}
         <Typography variant="subtitle1" fontWeight="bold" fontSize={"16px"}>Plants by CI Score Level</Typography>
      <Box display="flex" justifyContent="flex-end" mt={2}>
 <Box
          onClick={handleAddClick}
          sx={{
            cursor: "pointer",
            color: "#800000",
            fontSize: "0.875rem",
            textDecoration: "underline",
            fontWeight: "bold",
            "&:hover": { opacity: 0.8 },
          }}
        >
          Add Capacity
        </Box>
      </Box>

      <TableContainer sx={{ mt: 2, maxHeight: 300, width: "100%" }}>
        <Table
          size="small"
          sx={{ "& td, & th": { padding: "4px 10px", fontSize: "0.8rem" } }}
        >
          <TableHead sx={{ "& th": { fontWeight: "bold" } }}>
            <TableRow>
              <TableCell>Plant / Grade Level</TableCell>
              <TableCell>Delivery % of Total capacity</TableCell>
              <TableCell>Grower</TableCell>
              <TableCell>Retailer</TableCell>
              {/* <TableCell>National</TableCell>
              <TableCell>Custom</TableCell> */}
              <TableCell>Others</TableCell>
              <TableCell>No Score Grower</TableCell>
              <TableCell>No Score Retailer</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plantTableData?.length > 0 &&
              plantTableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {row.plant_name || "-"}
                    </TableCell>
                    <TableCell>{row.totalCapacity || "-"}</TableCell>
                    <TableCell>{row.grower_percentage + "%" || "-"}</TableCell>
                    <TableCell>
                      {row.retailer_percentage + "%" || "-"}
                    </TableCell>
                    {/* <TableCell>{row.national}</TableCell>
                <TableCell>{row.custom}</TableCell> */}
                    <TableCell>{row.other_percentage + "%" || "-"}</TableCell>
                    <TableCell>
                      {row.no_score_grower_percentage + "%" || "-"}
                    </TableCell>
                    <TableCell>
                      {row.no_score_retailer_percentage + "%" || "-"}
                    </TableCell>
                    <TableCell>{calculateTotal(row) || "-"}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={plantTableData?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton={true}
        showLastButton={true}
      />

          {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Add Quantity</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Select Plant</InputLabel>
            <Select
              value={selectedPlant}
              label="Select Plant"
              onChange={(e) => setSelectedPlant(e.target.value)}
            >
              {plantTableData?.length > 0 &&
                plantTableData
                  .filter((row) => row.plant_name !== "Total by Grade Level")
                  .map((row, idx) => (
                    <MenuItem key={idx} value={row.plant_name}>
                      {row.plant_name}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Total Capacity"
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!selectedPlant || !newQuantity}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    {/* </Box> */}
    </Paper>
  );
};

export default DeliveryTable;
