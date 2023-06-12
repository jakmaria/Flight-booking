import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFlightContext } from '../contexts/FlightContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../validation/FlightSearchValidation';

type Inputs = {
  from: string;
  to: string;
  departureDate: string;
};

const FlightSearch: React.FC = () => {
  const { state, filterFlights } = useFlightContext();
  const [searched, setSearched] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: Inputs) => {
    filterFlights(data);
    setSearched(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('from', { required: true })} placeholder="From" />
      {errors.from && <p>{errors.from.message}</p>}

      <input {...register('to', { required: true })} placeholder="To" />
      {errors.to && <p>{errors.to.message}</p>}

      <input {...register('departureDate', { required: true })} type="date" />
      {errors.departureDate && <p>{errors.departureDate.message}</p>}

      <input type="submit" />
      {searched && state.filteredFlights.length === 0 && (
        <p>No flights available with your specified criteria.</p>
      )}
    </form>
  );
};

export default FlightSearch;
