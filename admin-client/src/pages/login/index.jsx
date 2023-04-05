import { Box, Button, Grid, Paper, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const LoginPage = () => {
    const {control, handleSubmit, getValues} = useForm({defaultValues: {username: '', password: ''}})
   
    const onSubmit = (formData) => {
       
    }

 


    

    
  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
        <Grid xs={11} sm={6} item>
            <Box padding={(theme) => theme.spacing(3)} sx={{boxShadow: {sm: 2, xs: 0}, borderRadius: 2}} >
          
           <Typography  variant='2' textAlign="center" component="h2" >Admin Panel</Typography>
           <Toolbar/>
                <Box  onSubmit={handleSubmit(onSubmit)} component="form" >
                    <Grid gap={3} container >

                        <Grid  xs={12} item>
                            <Controller rules={{required: "Please enter your username"}}  name='username' control={control} render={({field: {onChange, value}, fieldState: {error}}) => 
                            
                       <TextField helperText={error?.message} error={error ? true : false} value={value} onChange={onChange} label="Username or Email" fullWidth/>
                            }/>
                            
                        </Grid>

                        <Grid  xs={12} item>
                            <Controller rules={{required: "Please enter your password"}} name='password' control={control} render={({field: {onChange, value}, fieldState: {error}}) => <TextField error={error ? true : false} helperText={error?.message} value={value} onChange={onChange} label="Password" type="password" fullWidth/>}/>
                        </Grid>

                        <Grid display="flex" justifyContent="center"  xs={12} item>
                            <Button type='submit' variant='contained'>Login</Button>
                        </Grid>
                    </Grid>
                </Box>
          
            </Box>
        </Grid>
    </Grid>
  )
}

LoginPage.getLayout = (page) => {
    return <>{page}</>
}

export default LoginPage