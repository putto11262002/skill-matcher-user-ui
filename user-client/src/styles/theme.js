import { createTheme } from "@mui/material";
import { blue, grey, lightBlue, red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            dark: blue.A700,
            main: blue.A400,
            light: blue.A200
        },
        secondary: {
            main: lightBlue.A400
        }
    },
  components: {
    MuiIconButton: {
        styleOverrides: {
            root: {
                width: 'auto'
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            // root: {
            //     // Some CSS
            //     borderRadius: 10
            // }
        }
    }
  }

});
