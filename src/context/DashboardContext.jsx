// context/DashboardContext.js
import React, { createContext, useState, useContext } from "react";
import { fetchDashboardData as fetchDashboardAPI } from "../services/api";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

   const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardAPI(); // Use shared API logic
      setDashboardData(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  
 

  return (
    <DashboardContext.Provider value={{ dashboardData, loading,loadDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
