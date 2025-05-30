import React from 'react'
import HeaderComponent from '../components/HeaderComponent';
import DashboardTopBar from '../components/DashboardTopBar';
import SummaryCardsSection from '../components/SummaryCardsSection';
import { useLocation } from 'react-router-dom';
import SourcingBottomComponent from '../components/SourcingBottomComponent';
import { Box } from '@mui/material';
import ProtectedRoute from "../components/ProtectedRoute";
import{ useDashboard  } from "../context/DashboardContext.jsx";
const SourcingPage = () => {
  ProtectedRoute();
  const { dashboardData, loading } = useDashboard();
  const location = useLocation();
  const email = location.state?.email || "guest@example.com";
    const userrole = location.state?.userrole || "guest"; 
  return (
    <>
        <Box sx={{backgroundColor:"#f5f5f5"}}>
        <HeaderComponent email={email} userrole={userrole} />
       
        <DashboardTopBar/>
       <SummaryCardsSection data={dashboardData} loading={loading} />
        <SourcingBottomComponent />
    </Box>
    </>
  )
}

export default SourcingPage
