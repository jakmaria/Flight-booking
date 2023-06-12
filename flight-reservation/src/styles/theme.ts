import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import backgroundImage from '../assets/Cloud_background.jpg';

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#519fcf',
            },
            '&:hover fieldset': {
              borderColor: '#b9d8eb',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1565c0',
            },
            '& input': {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              color: 'black',
            },
          },
          '& .MuiFormLabel-root': {
            color: 'black',
          },
        },
      },
    },
  },
});

export const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundAttachment: 'scroll',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  },
});
