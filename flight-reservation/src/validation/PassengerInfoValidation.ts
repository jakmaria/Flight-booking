import * as yup from 'yup';

export const passengerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full Name is required')
    .matches(/^[a-zA-Z\s]*$/, 'Full Name can only contain alphabets and spaces'),
  birthDate: yup
    .date()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  passportId: yup.string().required('Passport ID is required'),
});

export const passengerCountSchema = (maxSeats: number) =>
  yup.object().shape({
    numPassengers: yup
      .number()
      .required('Number of passengers is required')
      .min(1, 'At least one passenger is required')
      .max(maxSeats, `Maximum of ${maxSeats} passengers allowed`),
  });

export const schema = yup.object().shape({
  passengers: yup.array().of(passengerSchema),
});
