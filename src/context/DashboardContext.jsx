// context/DashboardContext.js
import React, { createContext, useState, useContext } from "react";
import {
  fetchDashboardData as fetchDashboardAPI,
  fetchManualInputs,
} from "../services/api";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [manualInputs, setManualInputs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardAPI();
      setDashboardData(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadManualInputs = async () => {
    setLoading(true);
    try {
      const data = await fetchManualInputs();
      setManualInputs(data);
    } catch (err) {
      console.error("Error fetching manual inputs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        manualInputs,
        loading,
        loadDashboardData,
        loadManualInputs,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
