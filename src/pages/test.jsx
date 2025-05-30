import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import OperatonalScoreCard from '../components/OperationalScoreCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
}));
function Test() {
  return (
    <Grid container spacing={2} sx={{ height: '100vh', p: 2 }}>
      {/* First column with nested grid */}
      <Grid item xs={6}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={12} sx={{ height: '50%',display:'flex', flexDirection:{ xs: 'column', md: 'row'}} } >
            <Item>
            <OperatonalScoreCard />
              
            </Item>
          </Grid>
          <Grid item xs={12} sx={{ height: '50%' }}>
            <Item>
              <Typography variant="h6">Card 2</Typography>
              <Typography>More content here. The grid cell maintains its size.</Typography>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      
      {/* Second column - single item */}
      <Grid item xs={6} sx={{ height: '100%' }}>
        <Item>
          <Typography variant="h6">Card 3</Typography>
          <Typography>This takes the full second column height.</Typography>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Test;
