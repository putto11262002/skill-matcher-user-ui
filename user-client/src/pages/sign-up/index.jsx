
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


const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  

    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);
    const {error:  signUpError, mutate, isLoading: isLoadingSignUp} = useMutation(signUp, {
        onSuccess: (res) => {
            router.push('/login')
        }
        
    })


    const handleSignUp = (e) => {
        e.preventDefault()
       mutate({username: username, password: password, firstName, lastName, email})
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
                            <Grid xs={12} sm={6} item>
                                <TextField
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    label='First name'
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    label='Last name'
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12}  item>
                                <TextField
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    label='Username'
                                    type='username'
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label='Email'
                                    type='email'
                                    fullWidth
                                />
                            </Grid>

                            <Grid xs={12} item>
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label='Password'
                                    type='password'
                                    fullWidth
                                />
                            </Grid>
                            <Grid display='flex' justifyContent='center' xs={12} item>
                                <Button type='submit' variant='contained' disabled={loading}>
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid item >
                            <Link href='/login'  variant='body2'>
                                {"Already have an account"}
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