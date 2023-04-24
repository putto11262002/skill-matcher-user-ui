import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
   <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <CircularProgress sx={{color: theme => theme.palette.text.primary}}/>
   </Box>
  )
}

export default Loader