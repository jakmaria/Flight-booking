import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import { Flight } from '../types/Flight';

type FlightDetailsProps = {
  flight: Flight;
};

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {
  const { state, setReservation } = useFlightContext();

  const handleReservation = (flight: Flight) => {
    setReservation(flight);
  };

  if (state.bookingStep !== 'SEARCH') {
    return null;
  }

  return (
    <div>
      <div>
        {flight.from} to {flight.to}
      </div>
      <div>Departure: {new Date(flight.departure).toLocaleString()}</div>
      <div>Arrival: {new Date(flight.arrival).toLocaleString()}</div>
      <div>Duration: {flight.duration}</div>
      <div>Price: {flight.price}</div>
      <button onClick={() => handleReservation(flight)}>Select</button>
    </div>
  );
};

export default FlightDetails;
