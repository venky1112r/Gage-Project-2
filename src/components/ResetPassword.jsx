import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/Cultura_Logo_Primary_LightBG.png";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    setToken(tokenFromUrl || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm password";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (res.ok) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        overflow: "hidden",
      }}
    >
      {/* Left Side - Branding */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "50vh", md: "100vh" },
          backgroundColor: "#d3e0d2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          position: "relative",
        }}
      >
        <Box margin="auto">
          <Typography
            variant="h1"
            fontWeight="bold"
            color="primary.main"
            sx={{ fontSize: { xs: "3rem", sm: "4rem", md: "5rem" } }}
          >
            G.A.G.E.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              color: "#2e5939",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Grown Above Ground Energy
          </Typography>
        </Box>
        <Box
          component="img"
          src={logo}
          alt="Company Logo"
          sx={{
            position: "absolute",
            bottom: { xs: 12, md: 24 },
            right: { xs: 12, md: 24 },
            width: { xs: 80, sm: 100, md: 140 },
            maxHeight: { xs: 60, sm: 80, md: 100 },
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "auto", md: "100vh" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "#fff",
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }} textAlign={"center"}>
            Reset Your Password
          </Typography>

          {message && (
            <Typography color="primary" variant="body2" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}

          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: null }));
            }}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: null }));
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            RESET PASSWORD
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
