import { createTheme, } from "@mui/material";
import { amber, blue, grey, lightBlue, orange, red, yellow } from "@mui/material/colors";


export const theme = createTheme({
    palette: {
        primary: {
           
            main: blue.A400,
         
        },
        secondary: {
            main: amber[400]
        }
    },
  components: {
    MuiIconButton: {
        styleOverrides: {
            root: {
                width: 'auto',
                
            }
        },
        
    },
    MuiButton: {
        styleOverrides: {
            root: {
                // Some CSS
               
            }
        },
        variants: [
             {
              props: { rounded: true},
              
              style:  {
                
             
                borderRadius: 8,
               
               
              
              }
              
            },
        ]
    }
  }

});
