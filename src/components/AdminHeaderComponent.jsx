import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

// const navItems = ["customers", "user-management"];

const AdminHeaderComponent = ({ email: propEmail, userrole: propUserrole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Use state from location if available, fallback to props
  const email = location.state?.email || propEmail || "guest@example.com";
  const userrole = location.state?.userrole || propUserrole || "guest";

    // Conditionally define nav items based on user role
  const allNavItems = ["customers", "user-management"];
  const navItems = userrole === "padmin"
    ? allNavItems.filter((item) => item !== "customers") // Hide "customers" for padmin
    : allNavItems;

  const currentTab = navItems.findIndex((item) =>
    location.pathname.toLowerCase().includes(item.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    const path = `/admin/${navItems[newValue].toLowerCase()}`;
    navigate(path, { state: { email, userrole } });
  };

  const handleAvatarClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

const handleLogout = () => {
  console.log("Logging out...");
  sessionStorage.removeItem("settingsTab");
  sessionStorage.removeItem("token");
  handleMenuClose();
  userrole === "gadmin"? navigate("/login-admin"):navigate("/login");
};



  

  const handleDashboard = () => {
    handleMenuClose();
    navigate("/dashboard", { state: { email, userrole } });
  };

  return (
    <AppBar position="static" elevation={1} sx={{ p: 1, bgcolor: "#fff" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 1, md: 2 },
          py: { xs: 1, md: 1 },
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#003320", cursor: "pointer" }}
          onClick={() => navigate("/dashboard", { state: { email, userrole } })}
        >
          G.A.G.E.
        </Typography>

        <Tabs
          value={currentTab === -1 ? 0 : currentTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : undefined}
          TabIndicatorProps={{ style: { backgroundColor: "#800000" } }}
        >
          {navItems.map((label, index) => (
            <Tab
              key={label}
              label={label.replace("-", " ").toUpperCase()}
              sx={{
                fontWeight: currentTab === index ? "bold" : "normal",
                color: currentTab === index ? "#800000" : "#000",
                textTransform: "none",
                fontSize: "15px",
              }}
            />
          ))}
        </Tabs>

    <Box sx={{ display: { xs: "block", md: "flex" } , flexDirection: "row", alignItems: "center", gap: 2}}>
           <Typography sx={{ fontWeight: "bold", color: "primary.main" , fontSize: "15px",  }}>{email}</Typography>
          <Avatar
            onClick={handleAvatarClick}
            sx={{
              bgcolor: "#c9d9c4",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {email.charAt(0).toUpperCase()}
          </Avatar>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem disabled>{`Logged in as: ${email}`}</MenuItem>
            <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>

           
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeaderComponent;
