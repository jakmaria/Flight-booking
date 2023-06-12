import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';

const Confirmation: React.FC = () => {
  const { state } = useFlightContext();
  const { reservation, selectedSeats, passengerInfo, confirmation } = state;

  if (state.bookingStep !== 'CONFIRMATION') {
    return null;
  }

  if (!reservation || !passengerInfo || !confirmation) {
    return <p>No reservation to display.</p>;
  }

  return (
    <div>
      <h2>Reservation Confirmation</h2>
      <p>Confirmation number: {confirmation}</p>
      <h3>Flight Details</h3>
      <p>From: {reservation.from}</p>
      <p>To: {reservation.to}</p>
      <p>Departure: {new Date(reservation.departure.toString()).toLocaleString()}</p>
      <p>Seats Selected: {selectedSeats.map((seat) => seat.id).join(', ')}</p>
      <h3>Passenger Information</h3>
      {passengerInfo.passengers.map((passenger) => {
        return (
          <div key={passenger.passportId}>
            <p>Name: {passenger.fullName}</p>
            <p>Date of Birth: {new Date(passenger.birthDate).toDateString()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Confirmation;
