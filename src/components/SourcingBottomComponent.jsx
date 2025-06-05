import React ,{ useEffect, useState }  from 'react'
import {Box, Grid, Typography} from "@mui/material";
import OperationalScoreCard from "../components/OperationalScoreCard";
import BushelsByCIScoreCard from "../components/BushelsByCIScoreCard";
import ContractsByCIScoreCard from "../components/ContractsByCIScoreCard";
import MySourcesTable from './MySourcesTable';
import SourcingOpportunitesMap from './SourcingOpportunitesMap';

const SourcingBottomComponent = (data ) => {
  const [sourcingTableData, setSourcingTableData]=useState([]);
  const [sourcingMapData, setSourcingMapData]=useState([]);
  // setSourcingMapData(data.data.opportunitiesMap);
  // setSourcingTableData(data.data.mySources);
  useEffect(() => {
  setSourcingMapData(data?.data?.opportunitiesMap);
  setSourcingTableData(data?.data?.mySources);
  },[data])
  console.log("opportunitiesMap data",sourcingMapData);
  console.log("sourcingTableData data",sourcingTableData);
  return (
    <Box sx={{ p: { xs: 2, sm: 2 }, mt: 0, py: 2 }}>
       <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
            
                    {/* <Box sx={{backgroundColor:"red"}}>Top</Box> */}
                    <MySourcesTable data={sourcingTableData}/>
              
            {/* <Box sx={{backgroundColor:"yellow"}}>Left</Box> */}
        </Grid>
        <Grid item xs={12} md={7}>

            {/* <Box sx={{backgroundColor:"red" , height:"100%"}}>Right</Box> */}
            <SourcingOpportunitesMap data={sourcingMapData}/>
        </Grid>
       </Grid>
    </Box>
);
};

export default SourcingBottomComponent;
