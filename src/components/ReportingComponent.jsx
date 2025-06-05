import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Alert,
    Typography,
  } from "@mui/material";
  import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { React, useState } from "react";
  
  const ReportingComponent = () => {
    const [report, setReport] = useState("");
    const [period, setPeriod] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [customDates, setCustomDates] = useState({ from: null, to: null });
    const [openPeriodSelect, setOpenPeriodSelect] = useState(false);
  
    const handleReportChange = (event) => {
      setReport(event.target.value);
      setTimeout(() => {
        setOpenPeriodSelect(true);
      }, 100);
    };
  
    const handlePeriodChange = (event) => {
      setPeriod(event.target.value);
      setOpenPeriodSelect(false);
    };
  
    const handleCustomDateChange = (field) => (newValue) => {
      setCustomDates({ ...customDates, [field]: newValue });
    };
  
    const handleGenarateReport = () => {
      // console.log("Generating report:", report, "for", period, "Dates:", customDates);
      setOpenSnackbar(true);
    };
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Box
            sx={{
              p: 3,
              m: 2,
              border: "1px solid #ccc",
              borderRadius: 4,
              bgcolor:"#fff"
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Generate & Download GAGE reports
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "column" },
                gap: 2,
                mb: 2,
                flexWrap: "wrap",
                maxWidth: 500,
              }}
            >
              <FormControl sx={{ minWidth: 250 }} size="small">
                <InputLabel>Select a report</InputLabel>
                <Select
                  value={report}
                  label="Select a report"
                  onChange={handleReportChange}
                >
                  <MenuItem value="report1">45z GREET Model audit data</MenuItem>
                </Select>
              </FormControl>
  
              <FormControl sx={{ minWidth: 250 }} size="small">
                <InputLabel>Select a period</InputLabel>
                <Select
                  value={period}
                  label="Select a period"
                  onChange={handlePeriodChange}
                  open={openPeriodSelect}
                  onOpen={() => setOpenPeriodSelect(true)}
                  onClose={() => setOpenPeriodSelect(false)}
                >
                  <MenuItem value="this_week">This year</MenuItem>
                  <MenuItem value="this_month">This Month</MenuItem>
                  <MenuItem value="previous_month">Previous month</MenuItem>
                  <MenuItem value="custom_period">Custom period</MenuItem>
                </Select>
              </FormControl>
  
              {/* Custom Period Date Inputs */}
              {period === "custom_period" && (
                <Box sx={{ display: "flex", gap: 2}}>
                  <DatePicker
                    label="From"
                    value={customDates.from}
                    onChange={handleCustomDateChange("from")}
                    format="MM/DD/YYYY"
                    slotProps={{
                      textField: {
                        size: "small",
                        helperText: "MM/DD/YYYY",
                      },
                    }}
                  />
                  <DatePicker
                    label="To"
                    value={customDates.to}
                    onChange={handleCustomDateChange("to")}
                    format="MM/DD/YYYY"
                    slotProps={{
                      textField: {
                        size: "small",
                        helperText: "MM/DD/YYYY",
                      },
                    }}
                  />
                </Box>
              )}
  
              <Button
                variant="contained"
                color="success"
                onClick={handleGenarateReport}
                sx={{ height: "40px", width: "45%", padding: {xs: "6px",md: "10px",lg :"12px"  } }}
              >
                Generate Report
              </Button>
            </Box>
  
            {/* Success Message Snackbar */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                Report is generated successfully
              </Alert>
            </Snackbar>
          </Box>
        </div>
      </LocalizationProvider>
    );
  };
  
  export default ReportingComponent;
  