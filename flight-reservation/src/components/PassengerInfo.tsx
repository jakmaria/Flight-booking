import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFlightContext } from '../contexts/FlightContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { passengerCountSchema, schema } from '../validation/PassengerInfoValidation';

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
  const { state, setPassengerInfo } = useFlightContext();

  const maxSeats = (state.reservation?.seats.filter((seat) => seat.available) || []).length;

  const {
    register: registerPassengerCount,
    handleSubmit: handleSubmitPassengerCount,
    formState: { errors: passengerCountErrors },
  } = useForm<PassengerCountFormData>({ resolver: yupResolver(passengerCountSchema(maxSeats)) });

  const {
    register: registerPassengerData,
    control,
    handleSubmit: handleSubmitPassengerData,
    formState: { errors: passengerErrors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

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

  const handleNumberOfPassengers = (data: { numPassengers: string }) => {
    setPassengerCount(parseInt(data.numPassengers));
  };

  if (state.bookingStep !== 'PASSENGER_INFO') {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmitPassengerCount(handleNumberOfPassengers)}>
        <h1>How many of you will be travelling?</h1>
        <input
          {...registerPassengerCount('numPassengers')}
          type="number"
          min="1"
          max={maxSeats}
          required
        />
        {passengerCountErrors.numPassengers && <p>{passengerCountErrors.numPassengers.message}</p>}

        <Button type="submit" variant="contained" color="primary">
          Set number of passengers
        </Button>
      </form>

      <form onSubmit={handleSubmitPassengerData(onSubmit)}>
        {fields.map((field, index) => {
          const passengerError = passengerErrors.passengers?.[index];
          const fullNameErrorMessage = passengerError?.fullName?.message || '';
          const birthDateErrorMessage = passengerError?.birthDate?.message || '';
          const passportIdErrorMessage = passengerError?.passportId?.message || '';

          return (
            <div key={field.id}>
              <TextField
                {...registerPassengerData(`passengers.${index}.fullName`)}
                label="Full Name"
                variant="outlined"
                required
                error={Boolean(fullNameErrorMessage)}
                helperText={fullNameErrorMessage}
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
                error={Boolean(birthDateErrorMessage)}
                helperText={birthDateErrorMessage}
              />

              <TextField
                {...registerPassengerData(`passengers.${index}.passportId`)}
                label="Passport ID"
                variant="outlined"
                required
                error={Boolean(passportIdErrorMessage)}
                helperText={passportIdErrorMessage}
              />
            </div>
          );
        })}
        <Button type="submit" variant="contained" color="primary">
          Confirm passenger info
        </Button>
      </form>
    </div>
  );
};

export default PassengerInfo;
