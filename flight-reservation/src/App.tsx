import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FlightSearch from './components/FlightSearch';
import FlightList from './components/FlightList';
import Confirmation from './components/Confirmation';
import PassengerInfo from './components/PassengerInfo';
import SeatSelection from './components/SeatSelection';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <FlightSearch />
      <FlightList />
      <PassengerInfo />
      <SeatSelection/>
      <Confirmation />
    </ThemeProvider>
  );
};

export default App;
