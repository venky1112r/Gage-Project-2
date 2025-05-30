import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import DashboardTopBar from "../components/DashboardTopBar";
import { useLocation } from "react-router-dom";
import ReportingComponent from "../components/ReportingComponent";
import { Box } from "@mui/material";
import ProtectedRoute from "../components/ProtectedRoute";
const ReportingPage = () => {
  ProtectedRoute();
  const location = useLocation();
  const email = location.state?.email || "guest@example.com";
    const userrole = location.state?.userrole || "guest";
  return (
    <>
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <HeaderComponent email={email} userrole={userrole} />
        <DashboardTopBar hideTimeRange />
        <ReportingComponent />
      </Box>
    </>
  );
};

export default ReportingPage;
