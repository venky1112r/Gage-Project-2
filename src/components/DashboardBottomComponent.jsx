import React from "react";
import { Box, Grid } from "@mui/material";
import OperationalScoreCard from "../components/OperationalScoreCard";
import BushelsByCIScoreCard from "../components/BushelsByCIScoreCard";
import ContractsByCIScoreCard from "../components/ContractsByCIScoreCard";
import DeliveryTable from "./DeliveryTable";

const DashboardBottomComponent = ({ data }) => {
  const levelColors = {
    'Grower': '#8B0000',
    'Retailer': '#A0522D',
    'National': '#D2691E',
    'Custom': '#DAA520',
    'No Score Grower': '#F4A300',
    'No Score Retailer': '#FF6347',
  };

  const deliveredData = (data?.contract_ci_score_level_delivered || []).map(item => ({
    label: item.nameidtype,
    value: item.total_delivered || 0,
    ciscore: item.ci_score || 0,
    color: levelColors[item.nameidtype] || '#ccc',
  }));

  const pendingData = (data?.contract_ci_score_level_pending || []).map(item => ({
    label: item.nameidtype,
    value: item.total_pending || 0,
    ciscore: item.ci_score || 0,
    color: levelColors[item.nameidtype] || '#ccc',
  }));

  return (
    <Box sx={{ p: { xs: 2, sm: 2 }, mt: 0 }}>
      <Grid container spacing={2}>
        {/* Operational Score Card */}
        <Grid item xs={12} sm={6} md={6}>
        <BushelsByCIScoreCard deliveredData={deliveredData} pendingData={pendingData} />
        
        </Grid>

        {/* Bushels By CI Score Card */}
        <Grid item xs={12} sm={6} md={6}>
            <OperationalScoreCard />
        </Grid>

        {/* Contracts By CI Score Card */}
        <Grid item xs={12} sm={6} md={6}>
          <ContractsByCIScoreCard deliveredData={deliveredData} pendingData={pendingData} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <DeliveryTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardBottomComponent;
