import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import { Seat } from '../types/Flight';

const SeatSelection: React.FC = () => {
  const { state, selectSeat, deselectSeat } = useFlightContext();

  const flight = state.reservation;

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
  return (
    <div>
      <h2>Select a Seat</h2>
      {flight.seats.map((seat: Seat) => (
        <button
          key={seat.id}
          onClick={() => {
            handleSeatClick(seat);
          }}
          disabled={!seat.available}
          title={seat.available ? '' : 'This seat is unavailable'}
          className={state.selectedSeats.find((s) => s.id === seat.id) ? 'selected' : ''}
        >
          {seat.number}
        </button>
      ))}
    </div>
  );
};

export default SeatSelection;
