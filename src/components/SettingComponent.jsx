import { React, useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";  // added
import BusinessRulesComponent from "./BusinessRulesComponent";
import ManualInputsComponent from "./ManualInputsComponent";

const SettingComponent = () => {
  const location = useLocation();  // added
  const navigate = useNavigate();  // added

  // Determine initial tab based on path
  const getTabFromPath = () => {
    if (location.pathname.includes("manual-inputs")) return 1;
    return 0; // default to Business Rules (index 0)
  };

  const [value, setValue] = useState(getTabFromPath()); // modified to init from path

  useEffect(() => {
    // Detect if this is a page reload
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    if (isReload) {
      const savedTab = sessionStorage.getItem("settingsTab");
      if (savedTab !== null) {
        setValue(parseInt(savedTab, 10));
      }
    }
  }, []);

  // Sync tab with URL on location change
  useEffect(() => {
    setValue(getTabFromPath());
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sessionStorage.setItem("settingsTab", newValue);
    const state = location.state || {};

    // Update URL based on tab change
    if (newValue === 0) {
      navigate("/settings/business-rules", { state });
    } else {
      navigate("/settings/manual-inputs", { state });
    }
  };

  return (
    <div>
      <Box
        sx={{
          p: 1,
          m: 2,
          border: "1px solid #ccc",
          borderRadius: 4,
          bgcolor: "#fff",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            mb: 1,
            color: "#000000",
            "& .MuiTabs-indicator": {
              backgroundColor: "#000000", // This changes the underline color
            },
          }}
        >
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "#000000",
              "&.Mui-selected": {
                color: "#000000", // This changes the underline color
              },
            }}
            label="Business Rules"
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "#000000",
              "&.Mui-selected": {
                color: "#000000", // This changes the underline color
              },
            }}
            label="Manual Inputs"
          />
        </Tabs>

        {value === 0 && (
          <Box sx={{ p: 1 }}>
            <BusinessRulesComponent />
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ p: 1 }}>
            <ManualInputsComponent />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SettingComponent;
