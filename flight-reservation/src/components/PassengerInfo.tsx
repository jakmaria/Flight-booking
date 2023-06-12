import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Box, Grid, TextField, Button } from '@mui/material';
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
  const [isPassengerCountSet, setIsPassengerCountSet] = useState(false);
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

  const handleNumberOfPassengers = useCallback((data: { numPassengers: string }) => {
    setPassengerCount(parseInt(data.numPassengers));
    setIsPassengerCountSet(true);
  }, []);

  const onSubmit = useCallback(
    (data: FormData) => {
      setPassengerInfo(data);
    },
    [setPassengerInfo]
  );

  if (state.bookingStep !== 'PASSENGER_INFO') {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="20vh"
      padding={2}
    >
      {!isPassengerCountSet && (
        <form onSubmit={handleSubmitPassengerCount(handleNumberOfPassengers)}>
          <h1>How many of you will be travelling?</h1>
          <TextField
            {...registerPassengerCount('numPassengers')}
            type="number"
            InputProps={{
              inputProps: {
                min: 1,
                max: maxSeats,
              },
            }}
            required
            variant="outlined"
            error={Boolean(passengerCountErrors.numPassengers)}
            helperText={passengerCountErrors.numPassengers?.message || ''}
            sx={{ height: '50px', minWidth: '5rem' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ ml: '1rem', height: '50px' }}
          >
            That's it!
          </Button>
        </form>
      )}

      <form onSubmit={handleSubmitPassengerData(onSubmit)}>
        {fields.map((field, index) => {
          const passengerError = passengerErrors.passengers?.[index];
          const fullNameErrorMessage = passengerError?.fullName?.message || '';
          const birthDateErrorMessage = passengerError?.birthDate?.message || '';
          const passportIdErrorMessage = passengerError?.passportId?.message || '';

          return (
            <Grid container direction="column" spacing={2} justifyContent="center" key={field.id}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...registerPassengerData(`passengers.${index}.fullName`)}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  error={Boolean(fullNameErrorMessage)}
                  helperText={fullNameErrorMessage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...registerPassengerData(`passengers.${index}.birthDate`)}
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  error={Boolean(birthDateErrorMessage)}
                  helperText={birthDateErrorMessage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...registerPassengerData(`passengers.${index}.passportId`)}
                  label="Passport ID"
                  variant="outlined"
                  fullWidth
                  required
                  error={Boolean(passportIdErrorMessage)}
                  helperText={passportIdErrorMessage}
                />
              </Grid>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Confirm passenger info
              </Button>
            </Grid>
          );
        })}
      </form>
    </Box>
  );
};

export default PassengerInfo;
