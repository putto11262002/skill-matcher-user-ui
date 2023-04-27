import { signIn, signOut } from '@/redux/thunks/user.thunk';
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: { usernameOrEmail: '', password: '' },
  });

  const dispatch = useDispatch();

  const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

  const router = useRouter();

  const handleLogin = ({ usernameOrEmail, password }, e) => {
    e.preventDefault();
    dispatch(signIn({ usernameOrEmail, password }));
  };

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push('/');
    }
  }, [loading, isLoggedIn]);


  return (
    <Grid container justifyContent='center' alignItems='center' height='100%'>
      <Grid xs={11} sm={6} md={5} lg={4} item>
        <Box
          padding={(theme) => theme.spacing(3)}
          sx={{ boxShadow: { sm: 2, xs: 0 }, borderRadius: 2 }}
        >
          
          <Typography
            variant="2"
            textAlign="center"
            component="h2"
            color={(theme) => theme.palette.primary.main}
          >
            Skill Matcher
          </Typography>
          <Typography variant='2' textAlign='center' component='h2'>
            Admin Panel
          </Typography>
          {/*<Toolbar />*/}
          <Box onSubmit={handleSubmit(handleLogin)} component='form'>

            <Grid gap={3} container>
              <Grid xs={12} item>
                {error && <Alert severity='error'>{error.message}</Alert>}
              </Grid>
              <Grid xs={12} item>
                <Controller
                  rules={{ required: 'Please enter your username' }}
                  name='usernameOrEmail'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      helperText={error?.message}
                      error={error ? true : false}
                      value={value}
                      onChange={onChange}
                      label='Username or Email'
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} item>
                <Controller
                  rules={{ required: 'Please enter your password' }}
                  name='password'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      error={error ? true : false}
                      helperText={error?.message}
                      value={value}
                      onChange={onChange}
                      label='Password'
                      type='password'
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid display='flex' justifyContent='center' xs={12} item>
                <Button type='submit' variant='contained' disabled={loading}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

LoginPage.getLayout = (page) => {
  return <>{page}</>;
};

export default LoginPage;
