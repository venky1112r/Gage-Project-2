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
} from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const BusinessRulesComponent = () => {
  const [rows, setRows] = useState( [
    {
      gradelevel:"National",
      civalue:"14.6",
      lastupdatedon:"01/01/2023",
      updatedby:"John Doe",
      actions:"Edit"
    },
    {
        gradelevel:"Retailer1",
        civalue:"12.6",
        lastupdatedon:"01/01/2023",
        updatedby:"John Doe",
        actions:"Edit"
    },{
        gradelevel:"Retailer2",
        civalue:"10.6",
        lastupdatedon:"01/01/2023",
        updatedby:"John Doe",
        actions:"Edit"
    },{
        gradelevel:"Retailer3",
        civalue:"8.6",
        lastupdatedon:"01/01/2023",
        updatedby:"John Doe",
        actions:"Edit"
    }
    
  ]);

  const [editIdx, setEditIdx] = useState(-1);
  const [editRowData, setEditRowData] = useState({});

    const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditRowData(rows[idx].civalue);
  };

  const handleSave = () => {
    const updatedRows = [...rows];  
    updatedRows[editIdx].civalue = editRowData;
    setRows(updatedRows);
    setEditIdx(-1);
  };

  const handleCancel = () => {
    setEditIdx(-1);
    setEditRowData({});
  };
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">CI Score Averages</Typography>
        <Box mt={1}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead  sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableRow>
                  <TableCell >Grade Level</TableCell>
                  <TableCell>CI Value</TableCell>
                  <TableCell>last updated on</TableCell>
                  <TableCell>Updated by</TableCell>
                  <TableCell align="center">Actions</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.gradelevel}</TableCell>
                    <TableCell>{row.civalue}</TableCell>
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
                          onClick={() => handleEdit(idx)}
                          size="small"
                        >
                          <ModeEditOutlineOutlinedIcon sx={{ color: '#000000' }} fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" sx={{ mt: 2 }} >
           Heat Maps Averages (Country/State)
            </Typography>
            <Button variant="outlined" sx={{ mt: 2, color: '#000000', borderColor: '#000000' }} >Upload DTN File</Button>
            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>File format: .csv file (5MB max)</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default BusinessRulesComponent;
