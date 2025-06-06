import React, { createContext, useState, useContext } from "react";
import {
  // fetchDashboardData,
  fetchDashboardSummaryMetrics,
  fetchDashboardContractsCi,
  fetchDashboardPlantsCi,
  fetchSourcingMysources,
  fetchSourcingOpportunitesMap,
  fetchManualInputs,
  fetchBusinessRules,
} from "../services/api";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // const [dashboardData, setDashboardData] = useState(null);
  const [summaryMetrics, setSummaryMetrics] = useState(null);
  const [contractsCi, setContractsCi] = useState(null);
  const [plantsCi, setPlantsCi] = useState(null);
  const [mySources, setMySources] = useState(null);
  const [opportunitiesMap, setOpportunitiesMap] = useState(null);
  const [manualInputs, setManualInputs] = useState([]);
  const [businessRules, setBusinessRules] = useState([]);


  const loadSummaryMetrics = async () => {
    
    try {
      const data = await fetchDashboardSummaryMetrics();
      setSummaryMetrics(data);
    } catch (err) {
      console.error("Error fetching summary metrics:", err);
    } 
  };

  const loadContractsCi = async () => {
    
    try {
      const data = await fetchDashboardContractsCi();
      setContractsCi(data);
    } catch (err) {
      console.error("Error fetching contract CI:", err);
    } 
  };

  const loadPlantsCi = async () => {
    try {
      const data = await fetchDashboardPlantsCi();
      setPlantsCi(data);
    } catch (err) {
      console.error("Error fetching plant CI:", err);
    } 
  };

  const loadMySources = async () => {

    try {
      const data = await fetchSourcingMysources();
      setMySources(data);
      console.log("data",data);
    } catch (err) {
      console.error("Error fetching my sources:", err);
    } 
  };

  const loadOpportunitiesMap = async () => {

    try {
      const data = await fetchSourcingOpportunitesMap();
      setOpportunitiesMap(data);
    } catch (err) {
      console.error("Error fetching opportunities map:", err);
    } 
  };

  const loadManualInputs = async () => {

    try {
      const data = await fetchManualInputs();
      setManualInputs(data);
    } catch (err) {
      console.error("Error fetching manual inputs:", err);
    } 
  };

  const loadBusinessRules = async () => {

    try {
      const data = await fetchBusinessRules();
      setBusinessRules(data);
      console.log("data",data);
    } catch (err) {
      console.error("Error fetching business rules:", err);
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        summaryMetrics,
        contractsCi,
        plantsCi,
        mySources,
        opportunitiesMap,
        manualInputs,
        businessRules,
        loadSummaryMetrics,
        loadContractsCi,
        loadPlantsCi,
        loadMySources,
        loadOpportunitiesMap,
        loadManualInputs,
        loadBusinessRules
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
