import { createTheme, } from "@mui/material";
import { blue, grey, lightBlue, red } from "@mui/material/colors";


export const theme = createTheme({
    palette: {
        primary: {
           
            main: blue.A400,
         
        },
        secondary: {
            main: '#f9c013'
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
