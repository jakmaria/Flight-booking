import * as yup from 'yup';

export const schema = yup.object().shape({
  from: yup.string().required('From field is required'),
  to: yup
    .string()
    .required('To field is required')
    .notOneOf([yup.ref('from'), null], 'From and To destinations cannot be the same'),
  departureDate: yup
    .date()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
    .nullable(),
});
