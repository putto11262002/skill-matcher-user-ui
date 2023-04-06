import userService from '@/services/user.service'
import { Button, Typography, Dialog, DialogTitle } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const UserPage = () => {
    
    const [showDialog, setShowDialog] = useState(false)
    const {data, isError, isLoading} = useQuery(['users'], userService.searchUsers)
  return (
    <div>
        {isLoading ? <p>Loading</p> :  data.data.data.map(user => <Button onClick={() => setShowDialog(true)} variant='contained'>{user.username}</Button>)}
        {showDialog &&  <Dialog onClose={() => setShowDialog(false)} open={showDialog}>
      <DialogTitle>Set backup account</DialogTitle></Dialog>}
    </div>
  )
}

export default UserPage