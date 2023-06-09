import React, { useReducer, useEffect } from 'react';
import mockFlights from '../mockData.json';
import { Flight, FlightSearch, Seat } from '../types/Flight';

interface State {
  flights: Flight[];
  filteredFlights: Flight[];
  reservation: Flight | null;
  selectedSeats: Seat[];
}

// Actions
type Action =
  | { type: 'LOAD_FLIGHTS'; payload: Flight[] }
  | { type: 'FILTER_FLIGHTS'; payload: FlightSearch }
  | { type: 'MAKE_RESERVATION'; payload: Flight }
  | { type: 'CLEAR_RESERVATION' }
  | { type: 'SHOW_ALL_FLIGHTS' }
  | { type: 'SELECT_SEAT'; payload: Seat }
  | { type: 'DESELECT_SEAT'; payload: Seat };

type ContextProps = [State, React.Dispatch<Action>];

const FlightContext = React.createContext<ContextProps | undefined>(undefined);

// Reducer function
const flightReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOAD_FLIGHTS':
      return { ...state, flights: action.payload };
    case 'SHOW_ALL_FLIGHTS':
      return {
        ...state,
        filteredFlights: state.flights,
      };
    case 'FILTER_FLIGHTS':
      const { from, to, departureDate } = action.payload;
      return {
        ...state,
        filteredFlights: state.flights.filter(
          (flight) =>
            flight.from === from &&
            flight.to === to &&
            new Date(flight.departure).toDateString() === new Date(departureDate).toDateString()
        ),
      };
    case 'MAKE_RESERVATION':
      return { ...state, reservation: action.payload };
    case 'CLEAR_RESERVATION':
      return { ...state, reservation: null };
    case 'SELECT_SEAT':
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload],
      };
    case 'DESELECT_SEAT':
      return {
        ...state,
        selectedSeats: state.selectedSeats.filter((seat) => seat.id !== action.payload.id),
      };

    default:
      return state;
  }
};

const FlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(flightReducer, {
    flights: [],
    filteredFlights: [],
    reservation: null,
    selectedSeats: [],
  });

  useEffect(() => {
    // This will load flights into state when the component is mounted
    dispatch({ type: 'LOAD_FLIGHTS', payload: mockFlights });
  }, []);

  return <FlightContext.Provider value={[state, dispatch]}>{children}</FlightContext.Provider>;
};

export const useFlightContext = () => {
  const context = React.useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within a FlightProvider');
  }
  const [state, dispatch] = context;

  const loadFlights = (flights: Flight[]) => dispatch({ type: 'LOAD_FLIGHTS', payload: flights });

  const filterFlights = (searchParams: FlightSearch) =>
    dispatch({ type: 'FILTER_FLIGHTS', payload: searchParams });

  const makeReservation = (flight: Flight) => {
    dispatch({ type: 'MAKE_RESERVATION', payload: flight });
  };

  const showAllFlights = () => {
    dispatch({ type: 'SHOW_ALL_FLIGHTS' });
  };

  const selectSeat = (seat: Seat) => {
    dispatch({ type: 'SELECT_SEAT', payload: seat });
  };
  
  const deselectSeat = (seat: Seat) => {
    dispatch({ type: 'DESELECT_SEAT', payload: seat });
  };
  

  return {
    state,
    loadFlights,
    filterFlights,
    makeReservation,
    showAllFlights,
    selectSeat,
    deselectSeat  };
};

export default FlightProvider;
