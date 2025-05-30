import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import SummaryCardsSection from "../components/SummaryCardsSection";
import DashboardBottomComponent from "../components/DashboardBottomComponent";
import DashboardTopBar from "../components/DashboardTopBar";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDashboard } from "../context/DashboardContext.jsx";

const DashboardPage = () => {
  ProtectedRoute(); // Ensure the route is protected

  const { dashboardData, loading, loadDashboardData } = useDashboard();
  const location = useLocation();
  const email = location.state?.email || "guest@example.com";
  const userrole = location.state?.userrole || "guest";

  useEffect(() => {
    if (!dashboardData) {
      loadDashboardData();
    }
  }, [dashboardData]);

  // const [dashboardData, setDashboardData] = useState(null);
  // const [loading, setLoading] = useState(true);

  //   useEffect(() => {

  //    if (!dashboardData) {
  //     fetchDashboardData();
  //   }
  //   }, []);
  //  const fetchDashboardData = async () => {
  //       try {
  //         const response = await fetch("http://localhost:3000/api/dashboard-metrics", {
  //           method: "GET",
  //           credentials: "include", // Important for sending cookies if your backend uses them
  //           headers: {
  //             "Content-Type": "application/json"
  //             // If you're using JWT in Authorization header, add:
  //             // "Authorization": `Bearer ${yourToken}`
  //           }
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to fetch dashboard data");
  //         }

  //         const data = await response.json();
  //         console.log(data,"data");
  //         setDashboardData(data);
  //       } catch (err) {
  //         console.error("Error fetching dashboard data:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
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
        <HeaderComponent email={email} userrole={userrole} />
        <DashboardTopBar />
        <SummaryCardsSection data={dashboardData} loading={loading} />
        <DashboardBottomComponent data={dashboardData} />
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
