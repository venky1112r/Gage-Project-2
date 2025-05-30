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
  Paper
} from "@mui/material";

const DeliveryTable = () => {
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

  const handleAddClick = () => setOpen(true);
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

  return (
          <Paper elevation={2} sx={{ borderRadius: 4, p: 2,  width: "100%",maxHeight: { md: "70vh" }, }}>
    <Box mt={1} sx={{ mt: 0 }}>
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

      <TableContainer sx={{ maxHeight: 300, width: "100%" }}>
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
              <TableCell>National</TableCell>
              <TableCell>Custom</TableCell>
              <TableCell>No Score Grower</TableCell>
              <TableCell>No Score Retailer</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ fontWeight: "bold" }}>{row.plant}</TableCell>
                <TableCell>{row.totalCapacity}</TableCell>
                <TableCell>{row.grower}</TableCell>
                <TableCell>{row.retailer}</TableCell>
                <TableCell>{row.national}</TableCell>
                <TableCell>{row.custom}</TableCell>
                <TableCell>{row.noScoreGrower}</TableCell>
                <TableCell>{row.noScoreRetailer}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Add Quantity</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Select Plant</InputLabel>
            <Select
              value={selectedPlant}
              label="Select Plant"
              onChange={(e) => setSelectedPlant(e.target.value)}
            >
              {rows
                .filter((row) => row.plant !== "Total by Grade Level")
                .map((row, idx) => (
                  <MenuItem key={idx} value={row.plant}>
                    {row.plant}
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
          <Button variant="contained" onClick={handleSave} disabled={!selectedPlant || !newQuantity}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Paper>
  );
};

export default DeliveryTable;
