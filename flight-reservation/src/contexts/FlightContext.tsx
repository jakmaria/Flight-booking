import React, { useReducer, useEffect } from 'react';
import mockFlights from '../mockData.json';
import { Flight, FlightSearch, Seat } from '../types/Flight';
import { FormData } from '../components/PassengerInfo';

interface State {
  flights: Flight[];
  filteredFlights: Flight[];
  reservation: Flight | null;
  selectedSeats: Seat[];
  passengerInfo: FormData | null;
  confirmation: string | null;
  bookingStep: 'SEARCH' | 'PASSENGER_INFO' | 'SEAT_SELECTION' | 'CONFIRMATION';
  error: string | null;
}

// Actions
type Action =
  | { type: 'LOAD_FLIGHTS'; payload: Flight[] }
  | { type: 'FILTER_FLIGHTS'; payload: FlightSearch }
  | { type: 'SET_RESERVATION'; payload: Flight }
  | { type: 'CLEAR_RESERVATION' }
  | { type: 'SHOW_ALL_FLIGHTS' }
  | { type: 'SELECT_SEAT'; payload: Seat }
  | { type: 'DESELECT_SEAT'; payload: Seat }
  | { type: 'SET_PASSENGER_INFO'; payload: FormData }
  | { type: 'CONFIRM_RESERVATION'; payload: string }
  | { type: 'SET_ERROR'; payload: string };

type ContextProps = [State, React.Dispatch<Action>];

const FlightContext = React.createContext<ContextProps | undefined>(undefined);

// Reducer function
const flightReducer = (state: State, action: Action): State => {
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
    case 'SET_RESERVATION':
      return { ...state, reservation: action.payload, bookingStep: 'PASSENGER_INFO' };
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
    case 'SET_PASSENGER_INFO':
      return { ...state, passengerInfo: action.payload, bookingStep: 'SEAT_SELECTION' };

    case 'CONFIRM_RESERVATION':
      return { ...state, confirmation: action.payload, bookingStep: 'CONFIRMATION' };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

const FlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: State = {
    flights: [] as Flight[],
    filteredFlights: [] as Flight[],
    reservation: null,
    selectedSeats: [] as Seat[],
    passengerInfo: null,
    confirmation: null,
    bookingStep: 'SEARCH',
    error: null,
  };

  const [state, dispatch] = useReducer(flightReducer, initialState);

  const fetchFlights = () => {
    return new Promise<Flight[]>((resolve, reject) => {
      setTimeout(() => {
        // Simulating a 10% chance that fetching flights fails
        if (Math.random() < 0.1) {
          reject(new Error('Failed to fetch flights'));
        } else {
          resolve(mockFlights);
        }
      }, 2000);
    });
  };

  useEffect(() => {
    fetchFlights()
      .then((flights) => {
        dispatch({ type: 'LOAD_FLIGHTS', payload: flights });
      })
      .catch((error) => {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      });
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

  const setReservation = (flight: Flight) => {
    dispatch({ type: 'SET_RESERVATION', payload: flight });
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

  const setPassengerInfo = (info: FormData) => {
    dispatch({ type: 'SET_PASSENGER_INFO', payload: info });
  };

  const confirmReservation = () => {
    // simulate making reservation...
    new Promise<string>((resolve) => setTimeout(() => resolve('CONFIRMATION123'), 2000)).then(
      (confirmation) => dispatch({ type: 'CONFIRM_RESERVATION', payload: confirmation })
    );
  };

  return {
    state,
    loadFlights,
    filterFlights,
    setReservation,
    showAllFlights,
    selectSeat,
    deselectSeat,
    setPassengerInfo,
    confirmReservation,
  };
};

export default FlightProvider;
