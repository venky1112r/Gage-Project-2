import React, { useState } from "react";
import {
  Box,
  Typography,
  // Select,
  // MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Divider,
} from "@mui/material";

const DashboardTopBar = ({ hideTimeRange = false }) => {
  // const [plant, setPlant] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  // const handlePlantChange = (event) => setPlant(event.target.value);
  const handleTimeRange = (_, newRange) => {
    if (newRange) setTimeRange(newRange);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
      flexDirection={{ xs: "column", sm: "row", md: "row" }}
      px={{ xs: 1, sm: 2, md: 3 }}
      py={2}
      mt={0}
    >
      {/* Left side: Text + Dropdown (no box look) */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "#222" }}
          />
        }
      >
       <Typography variant="h4" fontSize={{ xs: 20, md: 24,lg:32 }}>Clear Lake Energy</Typography>
        <Typography sx={{ fontSize: 18 }}>All Plants</Typography>
        {/* <Select
          value={plant}
          onChange={handlePlantChange}
          variant="standard"
          disableUnderline
sx={{
fontSize: 18,

            minWidth: 140,
            "& .MuiSelect-select": {
              paddingLeft: 1,
              paddingRight: 1,
            },
          }}
        >
          <MenuItem value="all">All Plants</MenuItem>
          <MenuItem value="northeast">Northeast</MenuItem>
          <MenuItem value="northwest">Northwest</MenuItem>
          <MenuItem value="southeast">Southeast</MenuItem>
          <MenuItem value="southwest">Southwest</MenuItem>
        </Select> */}
      </Stack>

      {/* Right side: Time range selector with equal width */}
      {!hideTimeRange && (
       <Box mt={{ xs: 0, md: 0 }} alignSelf={{ xs: "flex-end",sm:"flex-end", md: "flex-end" }}>
          <Typography
            variant="caption"
            display="block"
            textAlign={{xs:'right',sm:'right',md:'right'}}
            sx={{ mb: 0.5 }}
          >
            Last updated: January 31, 2025
          </Typography>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRange}
            size="small"
            aria-label="Time range"
            color="primary"
          >
            {["day", "week", "month", "year"].map((value) => (
              <ToggleButton
                key={value}
                value={value}
                sx={{
                  minWidth: 70,
                  color: timeRange === value ? "#fff" : "#1b5e20",
                  backgroundColor:
                    timeRange === value ? "#1b5e20" : "transparent",
                  borderColor: "#1b5e20",
                  "&.Mui-selected": {
                    color: "#fff",
                    backgroundColor: "#1b5e20",
                  },
                  textTransform: "capitalize",
                }}
              >
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant="caption" display="block" textAlign="right" sx={{ mt: 0.5 }}>
            Applicable Tax Year: 2025
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DashboardTopBar;
