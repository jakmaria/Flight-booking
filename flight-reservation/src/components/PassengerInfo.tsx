import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFlightContext } from '../contexts/FlightContext';

export type FormData = {
  passengers: {
    fullName: string;
    birthDate: string;
    passportId: string;
  }[];
};

export type PassengerCountFormData = {
  numPassengers: string;
};

const PassengerInfo: React.FC = () => {
  const [passengerCount, setPassengerCount] = useState(0);
  const {
    register: registerPassengerData,
    control,
    handleSubmit: handleSubmitPassengerData,
  } = useForm<FormData>();
  const { register: registerPassengerCount, handleSubmit: handleSubmitPassengerCount } =
    useForm<PassengerCountFormData>();
  const { state, setPassengerInfo } = useFlightContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passengers',
  });

  useEffect(() => {
    const numberOfPassengerForms = fields.length;

    if (numberOfPassengerForms < passengerCount) {
      for (let i = 0; i < passengerCount - numberOfPassengerForms; i++) {
        append({ fullName: '', birthDate: '', passportId: '' });
      }
    } else if (numberOfPassengerForms > passengerCount) {
      for (let i = 0; i < numberOfPassengerForms - passengerCount; i++) {
        remove(numberOfPassengerForms - i - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passengerCount]);

  const onSubmit = (data: FormData) => {
    setPassengerInfo(data);
  };

  const handleNumber = (data: { numPassengers: string }) => {
    setPassengerCount(parseInt(data.numPassengers));
  };

  const maxSeats = state.reservation?.seats.filter((seat) => seat.available).length;

  if (state.bookingStep !== 'PASSENGER_INFO') {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmitPassengerCount(handleNumber)}>
        <h1>How many of you will be travelling?</h1>
        <input
          {...registerPassengerCount('numPassengers')}
          type="number"
          min="1"
          max={maxSeats}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Set number of passengers
        </Button>
      </form>

      <form onSubmit={handleSubmitPassengerData(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <TextField
              {...registerPassengerData(`passengers.${index}.fullName`)}
              label="Full Name"
              variant="outlined"
              required
            />
            <TextField
              {...registerPassengerData(`passengers.${index}.birthDate`)}
              label="Date of Birth"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              {...registerPassengerData(`passengers.${index}.passportId`)}
              label="Passport ID"
              variant="outlined"
              required
            />
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Confirm passenger info
        </Button>
      </form>
    </div>
  );
};

export default PassengerInfo;
