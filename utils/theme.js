import { createTheme } from '@mui/material/styles';

// UI theme
export default createTheme({
    palette: {
        primary: {
          main: '#002147',
        },
        secondary: {
          main: '#001124',
        },
        background: {
            main: '#000000',
            secondary: '#282e36'
        },
        white: '#f2f2f2',
        black: 'black'
      },
    border: {
      radius: 5
    }
});