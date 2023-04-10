import { signUp } from '@/redux/thunks/user.thunk';
import {
    Alert,
    Box,
    Grid,
    TextField,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

    const router = useRouter();

    const handleSignUp = (e) => {
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
                    <Box onSubmit={handleSignUp} component='form'>
                        <Grid gap={3} container>
                            <Grid xs={12} item>
                                {error && <Alert severity='error'>{error.message}</Alert>}
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label='Name'
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
                            <Grid>
                            <Link href='/login' passHref>
                                <Button variant="Sign in button">Already have an account</Button>
                            </Link>
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
