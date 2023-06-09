import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import { Seat } from '../types/Flight';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const SeatSelection: React.FC = () => {
  const { state, selectSeat, deselectSeat, confirmReservation } = useFlightContext();

  const flight = state.reservation;

  const handleSeatClick = (seat: Seat) => {
    if (state.selectedSeats.find((s) => s.id === seat.id)) {
      deselectSeat(seat);
    } else {
      selectSeat(seat);
    }
  };

  const handleConfirmation = () => {
    confirmReservation();
  };

  const numberOfPassengers = state.passengerInfo?.passengers.length;
  const isSelectionCorrect = state.selectedSeats.length === numberOfPassengers;

  if (state.bookingStep !== 'SEAT_SELECTION') {
    return null;
  }
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <h2>Select a Seat</h2>
        {flight &&
          flight.seats.map((seat: Seat) => (
            <Button
              key={seat.id}
              onClick={() => {
                handleSeatClick(seat);
              }}
              disabled={!seat.available}
              title={seat.available ? '' : 'This seat is unavailable'}
              variant="contained"
              sx={
                state.selectedSeats.find((s) => s.id === seat.id)
                  ? {
                      backgroundColor: 'green',
                      '&:hover': { backgroundColor: 'darkgreen' },
                      m: '1rem',
                    }
                  : { m: '1rem' }
              }
            >
              {seat.number}
            </Button>
          ))}
        <Button
          onClick={() => {
            handleConfirmation();
          }}
          disabled={!isSelectionCorrect}
          variant="contained"
          color="primary"
          sx={{ mt: '2rem' }}
        >
          Confirm reservation
        </Button>
      </Box>
    </div>
  );
};

export default SeatSelection;
