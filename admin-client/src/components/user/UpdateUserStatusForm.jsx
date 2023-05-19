import { Button, ButtonGroup, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { USER_STATUS } from '../../constants/user.contant'
import { upperFirst } from 'lodash'

const UpdateUserStatusForm = ({currentStatus, onUpdateStatus}) => {
    const [status, setStatus] = useState(currentStatus);
    const handleToggleStatus = (_status) => {
        if(_status !== status) onUpdateStatus(_status)
        setStatus(_status)
    }
   useEffect(() => {
    setStatus(currentStatus)
   }, [currentStatus])
  return (
   <Stack spacing={3}>
    <Typography component='h2' variant='2'>Update User Status</Typography>
    <ButtonGroup >
        {Object.values(USER_STATUS).map(s => <Button key={s} onClick={() => handleToggleStatus(s)} variant={s === status ? 'contained' : 'outlined'}>{upperFirst(s)}</Button>)}
    </ButtonGroup>
   </Stack>
  )
}

export default UpdateUserStatusForm