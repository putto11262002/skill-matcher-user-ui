import { signUp } from '@/redux/thunks/user.thunk';
import {
    Alert,
    Box,
    Grid,
    Paper,
    TextField,
    Toolbar,
    Typography,
    useTheme,
    Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


const SignUpPage = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: { name: '', email: '', password: '' },
    });

    const dispatch = useDispatch();

    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

    const router = useRouter();

    const handleSignUp = ({ name, email, password }, e) => {
        e.preventDefault();
        dispatch(signUp({ name, email, password }));
    };

    useEffect(() => {
        if (!loading && isLoggedIn) {
            router.push('/');
        }
    }, [loading, isLoggedIn]);
    

    return (
        <Grid container justifyContent='center' alignItems='center' height='100%'>
            <Grid xs={11} sm={6} item>
                <Box
                    padding={(theme) => theme.spacing(3)}
                    sx={{ boxShadow: { sm: 2, xs: 0 }, borderRadius: 2 }}
                >
                    <Typography variant='2' textAlign='center' component='h2'>
                        Sign Up
                    </Typography>
                    <Toolbar />
                    <Box onSubmit={handleSubmit(handleSignUp)} component='form'>
                        <Grid gap={3} container>
                            <Grid xs={12} item>
                                {error && <Alert severity='error'>{error.message}</Alert>}
                            </Grid>
                            <Grid xs={12} item>
                                <Controller
                                    rules={{ required: 'Please enter your name' }}
                                    name='name'
                                    control={control}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            helperText={error?.message}
                                            error={error ? true : false}
                                            value={value}
                                            onChange={onChange}
                                            label='Name'
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <Controller
                                    rules={{ required: 'Please enter your email' }}
                                    name='email'
                                    control={control}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            helperText={error?.message}
                                            error={error ? true : false}
                                            value={value}
                                            onChange={onChange}
                                            label='Email'
                                            type='email'
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
                  signUp
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

SignUpPage.getLayout = (page) => {
  return <>{page}</>;
};

export default SignUpPage;

                            

