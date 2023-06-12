import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import { Flight } from '../types/Flight';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';

type FlightDetailsProps = {
  flight: Flight;
};

const FlightCard: React.FC<FlightDetailsProps> = ({ flight }) => {
  const { state, setReservation } = useFlightContext();

  const handleReservation = (flight: Flight) => {
    setReservation(flight);
  };

  if (state.bookingStep !== 'SEARCH') {
    return null;
  }
  const availableSeats = flight.seats.filter((seat) => seat.available).length;

  return (
    <Card sx={{ margin: 2, backgroundColor: '#e3f2fd' }}>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">
              {flight.from} to {flight.to}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Departure: {new Date(flight.departure.toString()).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>Arrival: {new Date(flight.arrival.toString()).toLocaleString()}</Typography>
          </Grid>
          <Grid item>
            <Typography>Duration: {flight.duration}</Typography>
          </Grid>
          <Grid item>
            <Typography>Price: {flight.price}</Typography>
          </Grid>
          <Grid item>
            {availableSeats && <Typography>Number of available seats: {availableSeats}</Typography>}
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleReservation(flight)}>
              Select
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
