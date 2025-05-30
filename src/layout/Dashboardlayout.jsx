import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import SummaryCard from "../components/SummaryCard";

const DashboardLayout = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid xs={12} md={6}>
        {/* <Paper sx={{ padding: 2 }}> */}
        <Typography variant="h6">Left Card</Typography>
        {/* </Paper> */}
      </Grid>
      <Grid xs={12} md={6}>
        {/* <Paper sx={{ padding: 2 }}> */}
        <Typography variant="h6">Left Card</Typography>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
