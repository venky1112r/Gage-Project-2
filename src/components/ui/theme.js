import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
    //   main: '#2A904C',
      main: '#0a371d', // green
    //   light: '', 
    //   dark: '',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2E58F5', // blue
    },
    text: {
      primary: '#101010',
      secondary:'#363636',
    }
  },
  typography: {
    fontFamily: 'Poppins, Gothic A1',
  },
});
export default theme