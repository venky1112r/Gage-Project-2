import React, { useEffect } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import DashboardTopBar from '../components/DashboardTopBar';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ProtectedRoute from "../components/ProtectedRoute";

const SettingsPage = () => {
  ProtectedRoute();

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "guest@example.com";
  const userrole = location.state?.userrole || "guest";
    const plantid = location.state?.plantid ;
   console.log(" settingsPlant ID:", plantid);

  // Redirect /settings to /settings/business-rules and preserve state
  useEffect(() => {
    const isBaseSettings = location.pathname === "/settings";
    if (isBaseSettings) {
      navigate("/settings/business-rules", { replace: true, state: location.state });
    }
  }, [location.pathname, navigate, location.state]);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <HeaderComponent email={email} userrole={userrole} />
      <DashboardTopBar hideTimeRange />
      <Outlet />
    </Box>
  );
};

export default SettingsPage;
