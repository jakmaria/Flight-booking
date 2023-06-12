import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFlightContext } from '../contexts/FlightContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../validation/FlightSearchValidation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

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

  if (state.bookingStep !== 'SEARCH') {
    return null;
  }

  return (
    <div>
      <h1>Where would you like to fly?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="row" spacing={2} justifyContent="center">
          <Grid item>
            <TextField
              {...register('from', { required: true })}
              placeholder="From"
              error={Boolean(errors.from)}
              helperText={errors.from?.message}
              style={{ height: '50px' }}
            />
          </Grid>

          <Grid item>
            <TextField
              {...register('to', { required: true })}
              placeholder="To"
              error={Boolean(errors.to)}
              helperText={errors.to?.message}
              style={{ height: '50px' }}
            />
          </Grid>

          <Grid item>
            <TextField {...register('departureDate')} type="date" style={{ height: '50px' }} />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" style={{ height: '50px' }}>
              Search
            </Button>
          </Grid>
        </Grid>

        {searched && state.filteredFlights.length === 0 && (
          <p>No flights available with your specified criteria.</p>
        )}
      </form>
    </div>
  );
};

export default FlightSearch;
