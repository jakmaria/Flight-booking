export type Flight = {
    id: number;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    price: number;
    seats: Seat[];
  };
  
  export type Seat = {
    id: number;
    number: string;
    available: boolean;
  };
  
  export type FlightSearch = {
    from: string;
    to: string;
    departureDate: string;
  };