import { signUp } from '@/redux/thunks/user.thunk';
import {
    Alert,
    Box,
    Grid,
    TextField,
    Toolbar,
    Typography,
    Button,
    Link,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import authService from '@/services/auth.service';


const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const [alertOpen, setAlertOpen] = useState(false); // to control the visibility of the alert

    const handleAlertClose = () => {
        setAlertOpen(false);
    }
    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);
    const { error: signUpError, mutate, isLoading: isLoadingSignUp } = useMutation(authService.signUp, {
        onSuccess: (res) => {
            setSuccessMessage('Sign up successful!');
            setAlertOpen(true);
            router.push('/login');
        },
        onError: (error) => {
            setErrorMessage(error.message);
            setAlertOpen(true);
        }
    });


    const handleSignUp = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            mutate({ username: email, password, firstName, lastName, email })
        } else {
            setErrorMessage('Passwords do not match');
            setAlertOpen(true);
        }
    };

    useEffect(() => {
        if (!loading && isLoggedIn) {
            router.push('/');
        }
    }, [loading, isLoggedIn]);

    return (
        <Grid container justifyContent='center' alignItems='center' height='100%'>
            <Grid xs={12} sm={8} md={4} item>
                <Box padding={(theme) => theme.spacing(3)}>
                    <Typography
                        variant="2"
                        textAlign="center"
                        component="h2"
                        color={(theme) => theme.palette.primary.main}
                    >
                        Skill Matcher
                    </Typography>
                    <Typography variant='2' textAlign='center' component='h2'>
                        Sign Up
                    </Typography>
                    <Toolbar />
                    <Box onSubmit={handleSignUp} component='form'>
                        <Grid spacing={3} container>
                            <Grid xs={12} item>
                                {error && <Alert severity='error'>{error.message}</Alert>}
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <TextField
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    label='First name'
                                    fullWidth
                                    required
                                    inputProps={{ minLength: 3 }}
                                />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <TextField
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    label='Last name'
                                    fullWidth
                                    required
                                    inputProps={{ minLength: 3 }}
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    label='Username'
                                    type='username'
                                    fullWidth
                                    required
                                    inputProps={{ minLength: 3 }}
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label='Email'
                                    type='email'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label='Password'
                                    type='password'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid display='flex' justifyContent='center' xs={12} item>
                                {successMessage && (
                                    <div style={{ color: 'green' }}>
                                        <Alert severity="success">Login successful!</Alert>
                                    </div>
                                )}
                                {errorMessage && (
                                    <div style={{ color: 'red' }}>
                                        <Alert severity="error">{errorMessage}</Alert>
                                    </div>
                                )}
                            </Grid>
                            <Grid display='flex' justifyContent='center' xs={12} item>
                                <Button type='submit' variant='contained' disabled={loading}>
                                    Sign Up
                                </Button>
                            </Grid>

                            <Grid marginTop={4} container justifyContent="center">
                                <Grid>
                                    <Link
                                        href="/login"
                                        sx={{
                                            color: (theme) => theme.palette.text.secondary,
                                            textDecorationColor: (theme) => theme.palette.text.secondary,
                                        }}
                                    >
                                        {"Already have an account? Log In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

SignUpPage.getLayout = (page) => {
    return <Box component='main' sx={{ height: '100vh', width: '100vw' }}>{page}</Box>
}

export default SignUpPage;
