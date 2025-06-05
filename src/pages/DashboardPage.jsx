import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import SummaryCardsSection from "../components/SummaryCardsSection";
import DashboardBottomComponent from "../components/DashboardBottomComponent";
import DashboardTopBar from "../components/DashboardTopBar";
// import ProtectedRoute from "../components/ProtectedRoute";
import { useDashboard } from "../context/DashboardContext.jsx";

const DashboardPage = () => {

  const {
    summaryMetrics,
    contractsCi,
    plantsCi,
    loadSummaryMetrics,
    loadContractsCi,
    loadPlantsCi,
  } = useDashboard();
  const location = useLocation();
  const email = location.state?.email || "guest@example.com";
  const userrole = location.state?.userrole || "guest";
  const plantid = location.state?.plantid;
  const [loading, setLoading] = useState(true);
  console.log("Plant ID:", plantid);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        if (!summaryMetrics) await loadSummaryMetrics();
        if (!contractsCi) await loadContractsCi(); // Add this line || mySources.length === 0) await loadMySources();
        if (!plantsCi) await loadPlantsCi();
       
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [loadSummaryMetrics, loadContractsCi, loadPlantsCi]);
  
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Dashboard content with conditional blur */}
      <Box
        sx={{
          filter: loading ? "blur(4px)" : "none",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <HeaderComponent email={email} userrole={userrole} plantid={plantid} />
        <DashboardTopBar />
        <SummaryCardsSection data={{ summaryMetrics, contractsCi, plantsCi }} />
        <DashboardBottomComponent data={{ summaryMetrics, contractsCi, plantsCi }} />
      </Box>

      {/* Spinner overlay */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} thickness={5} />
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;
