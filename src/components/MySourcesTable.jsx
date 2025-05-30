import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

const MySourcesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [cropFilter, setCropFilter] = useState("Corn");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [ciScoreGrade, setCIScoreGrade] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const rows = [
    {
      source: "Brown Country Elevators",
      type: "G",
      bushels: "7,234",
      percentTotal: "23.1%",
      authContracts: "98%",
      ciScore: 13.2,
      color: "#D24545",
    },
    {
      source: "Randal",
      type: "G",
      bushels: "7,012",
      percentTotal: "13.1%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
    {
      source: "Hamilton",
      type: "R",
      bushels: "7,234",
      percentTotal: "11.9%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
    {
      source: "Adams",
      type: "R",
      bushels: "7,234",
      percentTotal: "10.3%",
      authContracts: "98%",
      ciScore: 14.9,
      color: "#DC6B19",
    },
    {
      source: "Hart LLC",
      type: "R",
      bushels: "6,234",
      percentTotal: "9.1%",
      authContracts: "98%",
      ciScore: 11.9,
      color: "#F4C430",
    },
    {
      source: "Rapid Fall Elevators",
      type: "G",
      bushels: "6,012",
      percentTotal: "8.1%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
    {
      source: "Rapid Fall Elevators",
      type: "G",
      bushels: "6,012",
      percentTotal: "7.1%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
    {
      source: "Rapid Fall Elevators",
      type: "R",
      bushels: "6,012",
      percentTotal: "5.1%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
    {
      source: "Rapid Fall Elevators",
      type: "G",
      bushels: "6,012",
      percentTotal: "23.1%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
    {
      source: "Rapid Fall Elevators",
      type: "G",
      bushels: "6,012",
      percentTotal: "23.1%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
    {
      source: "Rapid Fall Elevators",
      type: "G",
      bushels: "6,012",
      percentTotal: "23.1%",
      authContracts: "98%",
      ciScore: 20.1,
      color: "#7D8F69",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setCIScoreGrade("");
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    setSelectedRow(null);
  };

  const handleSave = () => {
    handleClose();
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "All Sources" || row.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <>
      <Paper elevation={2} sx={{ borderRadius: 4, p: 2 , height: "100%"}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "18px" }}>
            My Sources
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Box ref={searchRef}>
              {searchOpen ? (
                <TextField
                  size="small"
                  autoFocus
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    width: 200,
                    transition: "width 0.3s",
                    "& .MuiOutlinedInput-root": {
                      height: 32,
                      borderRadius: "6px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#7B2D26" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <IconButton size="small" onClick={() => setSearchOpen(true)}>
                  <SearchIcon sx={{ color: "#7B2D26" }} />
                </IconButton>
              )}
            </Box>

            <Select
              size="small"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              sx={{
                width: 160,
                height: 32,
                border: "1px solid #9EA9A3",
                borderRadius: "6px",
                ".MuiSelect-select": { p: "6px" },
              }}
            >
              <MenuItem value="All Sources">All Sources</MenuItem>
              {[...new Set(rows.map((r) => r.source))].map((source) => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>

            <Select
              size="small"
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              sx={{
                width: 100,
                height: 32,
                border: "1px solid #9EA9A3",
                borderRadius: "6px",
                ".MuiSelect-select": { p: "6px" },
              }}
            >
              <MenuItem value="Corn">Corn</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ "& th": { fontWeight: "bold" } }}>
                <TableRow>
                  <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>Source</TableCell>
                  <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>Type</TableCell>
                  <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>Bushels</TableCell>
                  <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>% of Total</TableCell>
                  <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>Auth Contracts</TableCell>
                  <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>CI Score</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>{row.source}</TableCell>
                    <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>{row.type}</TableCell>
                    <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>{row.bushels}</TableCell>
                    <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>{row.percentTotal}</TableCell>
                    <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>{row.authContracts}</TableCell>
                    <TableCell sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            bgcolor: row.color,
                            borderRadius: "2px",
                          }}
                        />
                        <Typography sx={{ fontSize: { xs: "10px", sm: "10px", md: "12px" } }}>
                          {row.ciScore}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEditClick(row)} size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      <Dialog open={editOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit CI Score level</DialogTitle>
        {selectedRow && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Grower:</strong> {selectedRow.source}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Type:</strong> {selectedRow.type}
                </Typography>
                <Typography>
                  <strong>Commodity:</strong> {cropFilter}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {selectedRow.address || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>CI Score Grade level</InputLabel>
                  <Select
                    value={ciScoreGrade}
                    onChange={(e) => setCIScoreGrade(e.target.value)}
                    label="CI Score Grade level"
                  >
                    <MenuItem value="">No Score</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">
                  Last updated: January 31, 2025
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box p={2} bgcolor="#fff3cd" borderRadius={1}>
                  <Typography variant="body2">
                    ⚠ Any saved changes are applied to CI Score calculations overnight.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MySourcesTable;
