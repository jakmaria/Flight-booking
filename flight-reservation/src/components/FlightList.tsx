import React from 'react';
import { useFlightContext } from '../contexts/FlightContext';
import FlightDetails from './FlightDetails';

const FlightList: React.FC = () => {
  const { state, showAllFlights } = useFlightContext();

  if (state.bookingStep !== 'SEARCH') {
    return null;
  }

  return (
    <div>
      <button onClick={showAllFlights}>Show All Flights</button>
      {state &&
        state.filteredFlights.map((flight) => <FlightDetails key={flight.id} flight={flight} />)}
    </div>
  );
};

export default FlightList;
