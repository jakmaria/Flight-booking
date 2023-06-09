import React from 'react';
import FlightSearch from './components/FlightSearch';
import FlightList from './components/FlightList';
import FlightDetails from './components/FlightDetails';
import Confirmation from './components/Confirmation';

const App: React.FC = () => {
  return (
    <div>
      <FlightSearch />
      <FlightList />
      <FlightDetails />
      <Confirmation />
    </div>
  );
}

export default App;