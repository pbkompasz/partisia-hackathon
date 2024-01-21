import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#3f50b5',
      main: '#90caf9',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7921',
      main: '#2979ff',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
  }

});

export {
  theme,
};
