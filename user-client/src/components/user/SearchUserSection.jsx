import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import React from 'react'

const SearchUserSection = () => {
  return (
   <Stack width='100%'>
    <Box  component='form'>
    <Grid container>
      <Grid xs={12} item>
        <TextField fullWidth variant='outlined'/>
      </Grid>
      <Grid item>
        <Button variant='contained'>Search</Button>
      </Grid>
    </Grid>
    </Box>
   </Stack>
  )
}

export default SearchUserSection