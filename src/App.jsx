import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SourcingPage from "./pages/SourcingPage";
import Reporting from "./pages/ReportingPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Loginpage";
import Test from "./pages/test";
import GageLoginPage from "./pages/GageLoginpage";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardProvider } from "./context/DashboardContext.jsx";
import SettingComponent from "./components/SettingComponent"; // Import this
import EmailPreview from './components/EmailPreview';
import ResetPassword from "./components/ResetPassword.jsx";
function App() {
  return (
    <DashboardProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login-admin" element={<GageLoginPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/email-preview" element={<EmailPreview />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/sourcing" element={<SourcingPage />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/admin/*" element={<AdminPage />} />

            {/* Settings with nested routes */}
            <Route path="/settings" element={<SettingsPage />}>
              <Route index element={<Navigate to="business-rules" replace />} />
              <Route path="business-rules" element={<SettingComponent />} />
              <Route path="manual-inputs" element={<SettingComponent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </DashboardProvider>
  );
}

export default App;
