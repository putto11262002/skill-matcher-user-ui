import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
const UserSkill = ({skill, proficiency}) => {
  return (
    <Stack spacing={0.5}>
    <Typography variant='caption' color={theme => theme.palette.text.secondary}>{skill}</Typography>
    <Box sx={{width: '100%', height: '3px', borderRadius: 4, overflow: 'hidden', background: theme => theme.palette.grey[200]}}>
        <Box sx={{width: `${proficiency/10 * 100 || 0}%`, height: '100%', background: theme => theme.palette.primary.main}}></Box>
    </Box>
    </Stack>
  )
}

export default UserSkill