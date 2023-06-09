import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFlightContext } from '../contexts/FlightContext';

export type FormData = {
  fullName: string;
  birthDate: string;
  passportId: string;
};

const PassengerInfo: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { setPassengerInfo } = useFlightContext();
  const { state } = useFlightContext();

  const onSubmit = (data: FormData) => {
    setPassengerInfo(data);
  };

  if (state.bookingStep !== 'PASSENGER_INFO') {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('fullName')} label="Full Name" variant="outlined" required />
      <TextField
        {...register('birthDate')}
        label="Date of Birth"
        type="date"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField {...register('passportId')} label="Passport ID" variant="outlined" required />
      <Button type="submit" variant="contained" color="primary"> Confirm passenger info</Button>
    </form>
  );
};

export default PassengerInfo;
