import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/Cultura_Logo_Primary_LightBG.png";
import { loginUser } from "../services/api";
const GageLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserrole] = useState("");
  const [errors, setErrors] = useState({});
  // const [showSSO, setShowSSO] = useState(false);
  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
       const data = await loginUser({ email, password });
      // const response = await fetch("http://172.190.246.133/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   setErrors({ general: data.message || "Login failed" });
      //   return;
      // }

      const { token, userrole } = data;

      // ✅ Store the token in session storage
      sessionStorage.setItem("token", token);

      // ✅ Save user role
      setUserrole(userrole);

      console.log("Login successful", userrole);

      // ✅ Navigate to dashboard
      navigate("/dashboard", { state: { email, userrole } });
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Server error. Please try again." });
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

      {/* Right Side - Login Form */}
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
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "#fff",
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }} textAlign={"center"}>
            Log in as G.A.G.E Admin
          </Typography>

          {errors.general && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {errors.general}
            </Typography>
          )}

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            LOG IN
          </Button>

          {/* SSO Flow (disabled for now) */}
          {/* Uncomment the following if you want to enable SSO login later */}
          {/*
            <Typography variant="body1" sx={{ mt: 3 }}>
              Redirecting to secure SSO login page...
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#154734",
                "&:hover": { backgroundColor: "#2e5939" }
              }}
              onClick={() => {
                navigate("/dashboard", { state: { email } });
              }}
            >
              LOGIN VIA SSO
            </Button>
            */}
        </Box>
      </Box>
    </Box>
  );
};

export default GageLoginPage;
