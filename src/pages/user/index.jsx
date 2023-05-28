import Head from 'next/head';
import userService from '@/services/user.service'
import { Button, Typography, Dialog, DialogTitle, Link, Box, Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const UserPage = () => {

  const [showDialog, setShowDialog] = useState(false)
  const { data, isError, isLoading } = useQuery(['users'], userService.searchUsers)
  return (
    <div>
      {/* {isLoading ? <p>Loading</p> :  data.data.data.map(user => <Button key={user._id} onClick={() => setShowDialog(true)} variant='contained'>{user.username}</Button>)}
        {showDialog &&  <Dialog onClose={() => setShowDialog(false)} open={showDialog}>
        <DialogTitle>Set backup account</DialogTitle></Dialog>}*/}
      <>
        <Head>
          <title>Home Page | Skills Matcher</title>
          <meta name="description" content="Welcome to Skills Matcher" />
        </Head>
        <Box
          sx={{
            padding: '40px',
            backgroundColor: '#e1f5fe',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: '#333333',
              marginBottom: '20px',
              fontSize: {
                xs: '40px',
                sm: '60px',
                md: '80px',
              },
            }}
          >
            Welcome to Skills Matcher
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: '#666666',
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: {
                xs: '16px',
                sm: '20px',
                md: '24px',
              },
            }}
          >
            Discover new skills and connect with like-minded individuals on our cutting-edge app. Whether you're looking to learn a new skill or share your expertise with others, our platform provides the perfect one-stop solution. Join our community today and start unlocking your full potential!
          </Typography>
          <Link href="/profile-creation" underline="none">
            <Button
              variant="contained"
              color="primary"
              sx={{
                my: 4,
                background: 'linear-gradient(to bottom right, #055fef, #58a6ff)',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                width: { xs: '100%', sm: '75%', md: '100%' },
                height: { xs: '50px', sm: '60px', md: '70px' },
                '&:hover': {
                  background: 'linear-gradient(45deg, #055fef, #58a6ff)',
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              Get started on your profile
            </Button>
          </Link>

          <Link href="/user/browse" underline="none">
            <Button
              variant="contained"
              color="primary"
              sx={{
                my: 4,
                background: 'linear-gradient(to bottom right, #055fef, #58a6ff)',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                width: { xs: '100%', sm: '75%', md: '100%' },
                height: { xs: '50px', sm: '60px', md: '70px' },
                '&:hover': {
                  background: 'linear-gradient(45deg, #055fef, #58a6ff)',
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              Check out your feed
            </Button>
          </Link>
        </Box>
      </>
    </div>
  )
}

export default UserPage