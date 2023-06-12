import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import { Seat } from '../types/Flight';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  selected: {
    backgroundColor: 'green',
  },
});

const SeatSelection: React.FC = () => {
  const { state, selectSeat, deselectSeat, confirmReservation } = useFlightContext();

  const flight = state.reservation;
  const classes = useStyles();

  if (!flight) {
    return <div>No flight selected</div>;
  }

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

  if (state.bookingStep !== 'SEAT_SELECTION') {
    return null;
  }
  return (
    <div>
      <h2>Select a Seat</h2>
      {flight.seats.map((seat: Seat) => (
        <Button
          key={seat.id}
          onClick={() => {
            handleSeatClick(seat);
          }}
          disabled={!seat.available}
          title={seat.available ? '' : 'This seat is unavailable'}
          variant="contained"
          className={state.selectedSeats.find((s) => s.id === seat.id) ? classes.selected : ''}
        >
          {seat.number}
        </Button>
      ))}
      <Button
        onClick={() => {
          handleConfirmation();
        }}
      >
        Confirm reservation
      </Button>
    </div>
  );
};

export default SeatSelection;
