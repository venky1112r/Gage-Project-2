import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { checkAuth } from "../services/api";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Separate loading flag


  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true); // start loading

      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // const response = await fetch("http://localhost:3000/api/protected", {
        //   method: "GET",
        //   headers: { Authorization: `Bearer ${token}` },
        //   credentials: "include",
        // });

        // setIsAuthenticated(response.ok);
        const isValid = await checkAuth(token); // ✅ Call service
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // stop loading
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading authentication...</Typography>
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
