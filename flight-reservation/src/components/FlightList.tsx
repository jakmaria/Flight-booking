import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import { Flight } from '../types/Flight';

const FlightList: React.FC = () => {
  const { state, makeReservation, showAllFlights } = useFlightContext();

  const handleReservation = (flight: Flight) => {
    makeReservation(flight);
  };

  return (
    <div>
      <button onClick={showAllFlights}>Show All Flights</button>
      {state &&
        state.filteredFlights.map((flight: Flight) => (
          <div key={flight.id}>
            <div>
              {flight.from} to {flight.to}
            </div>
            <div>Departure: {new Date(flight.departure).toLocaleString()}</div>
            <div>Arrival: {new Date(flight.arrival).toLocaleString()}</div>
            <div>Duration: {flight.duration}</div>
            <div>Price: {flight.price}</div>
            <button onClick={() => handleReservation(flight)}>Select</button>
          </div>
        ))}
    </div>
  );
};

export default FlightList;
