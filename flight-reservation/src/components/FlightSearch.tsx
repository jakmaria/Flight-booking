import React from 'react';
import { useForm } from 'react-hook-form';
import { useFlightContext } from '../contexts/FlightContext';

type Inputs = {
  from: string;
  to: string;
  departureDate: string;
};

const FlightSearch: React.FC = () => {
  const { filterFlights } = useFlightContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    filterFlights(data);
    // Here you will dispatch the action to filter flights based on search criteria.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('from', { required: true })} placeholder="From" />
      {errors.from && <p>This field is required</p>}

      <input {...register('to', { required: true })} placeholder="To" />
      {errors.to && <p>This field is required</p>}

      <input {...register('departureDate', { required: true })} type="date" />
      {errors.departureDate && <p>This field is required</p>}

      <input type="submit" />
    </form>
  );
};

export default FlightSearch;
