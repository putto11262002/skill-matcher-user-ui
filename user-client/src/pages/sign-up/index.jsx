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
//import Link from 'next/link';
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
    const [message, setMessage] = useState('');
    const router = useRouter();


    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);
    const { error: signUpError, mutate, isLoading: isLoadingSignUp } = useMutation(authService.signUp, {
        onSuccess: (res) => {
            setMessage('Sign up successful!');
            router.push('/login');
        },
        onError: (error) => {
            setMessage(error.message);
        }
    })


    const handleSignUp = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            mutate({ username: email, password, firstName, lastName, email })
        } else {
            setMessage('Passwords do not match');
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
                <Box
                    padding={(theme) => theme.spacing(3)}
                    sx={{ boxShadow: { sm: 2, xs: 0 }, borderRadius: 2 }}
                >
                    <Typography variant='2' textAlign='center' component='h2'>
                        Sign Up
                    </Typography>
                    <Toolbar />
                    {error && <Typography>error.message</Typography>}
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
                                    inputProps={{ minLength:3}}
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
                                <Button type='submit' variant='contained' disabled={loading}>
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid>
                            <Link href='/login' passHref>
                                    <Button disabled={isLoadingSignUp} variant="Sign in button">Already have an account</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignUpPage;
