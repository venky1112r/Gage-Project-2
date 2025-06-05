import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import DashboardTopBar from "../components/DashboardTopBar";
import SummaryCardsSection from "../components/SummaryCardsSection";
import { useLocation } from "react-router-dom";
import SourcingBottomComponent from "../components/SourcingBottomComponent";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDashboard } from "../context/DashboardContext.jsx";
import { Box, CircularProgress } from "@mui/material";

const SourcingPage = () => {
  const {
    mySources,
    opportunitiesMap,
    summaryMetrics,
    loadMySources,
    loadSummaryMetrics,
    loadOpportunitiesMap,
  } = useDashboard();
  const location = useLocation();
  const email = location.state?.email || "guest@example.com";
  const userrole = location.state?.userrole || "guest";
  const [sourcingData, setSourcingData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true); // Only once
      try {
        if (!summaryMetrics) await loadSummaryMetrics();
        if (!mySources || mySources.length === 0) await loadMySources();
        if (!opportunitiesMap) await loadOpportunitiesMap();
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false); // Only once
      }
    };
    loadAllData();
  }, []);

  useEffect(() => {
    if (summaryMetrics && mySources && opportunitiesMap) {
      setSourcingData({ mySources, opportunitiesMap, summaryMetrics });
    }
  }, [summaryMetrics, mySources, opportunitiesMap]);
  console.log("sourcig ", sourcingData);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <HeaderComponent email={email} userrole={userrole} />
        <DashboardTopBar />
        <SummaryCardsSection data={sourcingData} loading={loading} />
        <SourcingBottomComponent data={sourcingData} />

        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SourcingPage;
