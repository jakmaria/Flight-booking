import React, { useState } from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import FlightCard from './FlightDetails';
import { Box, Button, Grid } from '@mui/material';

const FlightList: React.FC = () => {
  const { state, showAllFlights, hideAllFlights } = useFlightContext();
  const [showAll, setShowAll] = useState(false);

  const handleShowAllFlights = () => {
    if (!showAll) {
      showAllFlights();
    } else {
      hideAllFlights();
    }
    setShowAll(!showAll);
  };

  if (state.bookingStep !== 'SEARCH') {
    return null;
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" marginBottom="2rem" marginTop="2rem">
        <Button
          onClick={handleShowAllFlights}
          variant="contained"
          color="primary"
          style={{ height: '50px' }}
        >
          {state.filteredFlights.length > 0 ? 'Hide All Flights' : 'Show All Flights'}
        </Button>
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        {state &&
          state.filteredFlights.map((flight) => (
            <Grid item xs={12} sm={6} md={4} key={flight.id}>
              <FlightCard flight={flight} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default FlightList;
