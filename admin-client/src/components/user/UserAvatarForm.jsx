import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SingleFileUpload from '../common/form/SingleFileUpload'

const UserAvatarForm = ({onUpload, avatar, loading, error}) => {
  return (
    
      <Stack>
        <Typography variant='2' component='h2'>User Avatar</Typography>
        
        <SingleFileUpload loading={loading} error={error} onUpload={onUpload} imageUrl={avatar?.url} />
       
     
      </Stack>
   
  )
}

export default UserAvatarForm