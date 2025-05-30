import { React, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import ContractsChart from "./ContractsChart";
import DeliveryTable from "./DeliveryTable";
import CheckIcon from "@mui/icons-material/Check";
import styled from '@emotion/styled';

// const data = [
//   { grade: "Grower", bushels: 2784,pending: 540, ciScore: 30 },
//   { grade: "Retailer", bushels: 2607,pending: 0, ciScore: 26 },
//   { grade: "National", bushels: 3900,pending: 200, ciScore: 35 },
//   { grade: "Custom", bushels: 2431,pending: 120, ciScore: 22 },
//   { grade: "No Score Grower", bushels: 2045,pending: 1294, ciScore: 18 },
//   { grade: "No Score Retailer", bushels: 1224,pending: 296, ciScore: 20 },
// ];

const ContractsByCIScoreCard = ( {deliveredData, pendingData}) => {
//   const ciScores = {
//   "Grower": 30,
//   "Retailer": 26,
//   "National": 35,
//   "Custom": 22,
//   "No Score Grower": 18,
//   "No Score Retailer": 20,
// };

const combinedDataMap = {};

deliveredData.forEach(item => {
  combinedDataMap[item.label] = {
    grade: item.label,
    bushels: item.value,
    pending: 0,
    ciScore: item.ciscore || 0
  };
});

pendingData.forEach(item => {
  if (combinedDataMap[item.label]) {
    combinedDataMap[item.label].pending = item.value;
  } else {
    combinedDataMap[item.label] = {
      grade: item.label,
      bushels: 0,
      pending: item.value,
      ciScore: item.ciscore || 0
    };
  }
});

const data = Object.values(combinedDataMap);
// console.log(data);

  const [view, setView] = useState("delivered");

  const handleViewChange = (event, newView) => {
    if (newView === null) {
      setView("delivered");
    }
    setView(newView);
  };


const CustomToggleButton = styled(ToggleButton)`
 min-width: 120px ;
 text-transform: none`;


  return (
    <Paper elevation={2} sx={{ borderRadius: 4, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ fontSize: "16px"}}>
          Contracts by CI Score level
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <CustomToggleButton value="delivered">
            Delivered
            <CheckIcon fontSize="small" sx={{ m: 1 }} />
          </CustomToggleButton>
          <CustomToggleButton value="pending">
            Pending
            {view === "pending" && (
              <CheckIcon fontSize="small" sx={{ m: 1 }} />
            )}
          </CustomToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Box mt={1}>
        <ContractsChart data={data} width={500} height={400} view={view} />
        <Divider
            orientation="horizontal"
            flexItem
            sx={{ borderColor: "#D3D3D3" }}
          />
        {/* <DeliveryTable /> */}
      </Box>
    </Paper>
  );
};

export default ContractsByCIScoreCard;
