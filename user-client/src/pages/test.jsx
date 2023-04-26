<<<<<<< HEAD
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'

const test = () => {
  return (
    <Stack sx={{ alignItems: 'center'}} spacing={1}>
        <Avatar/>
        <Typography>First name last name</Typography>
        
    </Stack>
  )
}



export default test
=======
import { Book, Home } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const test = () => {
  return (
    <Stack sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
      <Avatar />
      <Typography>NAme</Typography>
      <Stack spacing={2} direction="row" sx={{alignItems: 'center'}}>
       <Tooltip title="Go home">
       <IconButton>
          <Home />
        </IconButton>
       </Tooltip>
        <Book />
      </Stack>
      {/* Total 12 grids */}
      <Grid sx={{width: '100%', justifyContent: 'flex-end'}} container>
        <Grid xs={6} md={7} sx={{background: 'red'}} item>
        the
        </Grid>

        <Grid xs={4} md={7} sx={{background: 'blue'}} item>
        the
        </Grid>
      </Grid>
    </Stack>
  );
};

export default test;
>>>>>>> 2161b571ce8fc2e26835eeb19e197e1e1fae2361
