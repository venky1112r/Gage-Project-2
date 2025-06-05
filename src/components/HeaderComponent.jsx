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

const navItems = ["Dashboard", "Sourcing", "Reporting", "Settings"];

const HeaderComponent = ({ email, userrole, plantid }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);

  const currentTab = navItems.findIndex((item) =>
    location.pathname.toLowerCase().includes(item.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    const path = `/${navItems[newValue].toLowerCase()}`;
    navigate(path, { state: { email, userrole, plantid } });
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
    userrole === "GAdmin"
      ? navigate("/login-admin")
      : navigate("/login");
  };

  const handleManageUsers = () => {
    handleMenuClose();
    navigate("/admin/user-management", {
      state: { email, userrole },
    });
  };

  const handleManageCustomers = () => {
    handleMenuClose();
    navigate("/admin/customers", {
      state: { email, userrole },
    });
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={1} sx={{ bgcolor: "#fff" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 1, md: 2 },
            py: { xs: 1, md: 1 },
            minHeight: "56px !important",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#003320",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate("/dashboard", { state: { email, userrole, plantid } })
            }
            fontSize={{ xs: "1.5rem",sm: "1.8rem", md: "2.5rem" }}
          >
            G.A.G.E.
          </Typography>

          {!isMobile && (
            <Tabs
              value={currentTab === -1 ? 0 : currentTab}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              TabIndicatorProps={{ style: { backgroundColor: "#800000" } }}
            >
              {navItems.map((label, index) => (
                <Tab
                  key={label}
                  label={label.toUpperCase()}
                  sx={{
                    fontWeight: currentTab === index ? "bold" : "bold",
                    color: currentTab === index ? "#800000" : "#000",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                />
              ))}
            </Tabs>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                fontSize: "14px",
              }}
            >
              {email}
            </Typography>
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
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disabled>{`Logged in as: ${email}`}</MenuItem>

              {userrole === "GAdmin" && (
                <MenuItem onClick={handleManageCustomers}>
                  Manage Customers / Users
                </MenuItem>
              )}

              {userrole === "PAdmin" && (
                <MenuItem onClick={handleManageUsers}>Manage Users</MenuItem>
              )}

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>

        {/* Mobile Tabs Below Header - Seamlessly Merged */}
        {isMobile && (
          <Box
            sx={{
              bgcolor: "#fff",
              p: 0,
              m: 0,
              borderTop: "1px solid #fff",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Tabs
              value={currentTab === -1 ? 0 : currentTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              textColor="inherit"
              indicatorColor="secondary"
              TabIndicatorProps={{ style: { backgroundColor: "#800000" } }}
              sx={{
                px: 1,
                minHeight: "40px",
              }}
            >
              {navItems.map((label, index) => (
                <Tab
                  key={label}
                  label={label.toUpperCase()}
                  sx={{
                    fontWeight: currentTab === index ? "bold" : "normal",
                    color: currentTab === index ? "#800000" : "#000",
                    textTransform: "none",
                    fontSize: "12px",
                    minHeight: "40px",
                    py: 0,
                    my: 0,
                  }}
                />
              ))}
            </Tabs>
          </Box>
        )}
      </AppBar>
    </>
  );
};

export default HeaderComponent;
