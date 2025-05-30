import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import SummaryCard from './SummaryCard';

const SummaryCardsSection = ( { data } ) => {
  // console.log(data, "ss");
  return (
    < >
  <Box sx={{ mt: 0 , mb: 0 ,px: 2 }}>
      <Grid container spacing={2} alignItems="stretch">
  {/* Contracted CI Score */}
  {/* <Grid item xs={12} md={5} sx={{ display: 'flex' }}> */}
   <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
    <SummaryCard
      label="Contracted CI Score"
      value={data?.summary[0]?.contracted_ci_score}
      // delta="+1.2"
      // isPositive={true}
      labelVariant="subtitle2"
      valueVariant="h1"
    />
  </Grid>

  {/* Other Cards */}
  {/* <Grid item xs={12} md={7} >
    <Grid container spacing={2} >
    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}> */}
     <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
        <SummaryCard
          label={ <>
      Contracted Bushels{' '}
       <Typography component="span" variant="caption" sx={{ fontSize: '0.75rem' }}>
        (in Millions)
      </Typography>
    </>}
         value={
    (data?.summary[0]?.contracted_bushels / 1_000_000)
      ?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }
          // delta="+1.2%"
          // isPositive={true}
        />
      </Grid>
       <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
        <SummaryCard
          label="Rebate"
          value={`$${data?.summary[0]?.rebate?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}
          // delta="-1.1%"
          // isPositive={false}
        />
      </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
        <SummaryCard
          label="Authorized Growers"
          value={`${data?.summary[0]?.authorized_growers}%`}
          // delta="-1.1%"
          // isPositive={false}
        />
      </Grid>
    </Grid>
  {/* </Grid>
</Grid> */}

    </Box>
    </>
  );
};

export default SummaryCardsSection;
