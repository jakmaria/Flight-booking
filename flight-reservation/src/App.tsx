import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import FlightSearch from './components/FlightSearch';
import FlightList from './components/FlightList';
import Confirmation from './components/Confirmation';
import PassengerInfo from './components/PassengerInfo';
import SeatSelection from './components/SeatSelection';
import { theme, useStyles } from './styles/theme';
import { CssBaseline, Box, Grid } from '@mui/material';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ paddingTop: '15rem' }}
        >
          <FlightSearch />
          <FlightList />
          <PassengerInfo />
          <SeatSelection />
          <Confirmation />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
