import { signIn, signOut } from '@/redux/thunks/user.thunk';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const LoginPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  if (isLoggedIn) {
    router.push('/');
  }

  return (
    <Grid container justifyContent='center' alignItems='center' height='100%'>
      <Grid xs={11} sm={6} item>
        <Box
          padding={(theme) => theme.spacing(3)}
          sx={{ boxShadow: { sm: 2, xs: 0 }, borderRadius: 2 }}
        >
          <Typography variant='2' textAlign='center' component='h2'>
            Log in 
          </Typography>
          <Toolbar />
          <Box component='form' onSubmit={handleLogin}>
            <Grid gap={3} container>
              <Grid xs={12} item>
                {error && <Alert severity='error'>{error.message}</Alert>}
              </Grid>
              <Grid xs={12} item>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid xs={12} item>
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
              </Grid>
              <Grid display='flex' justifyContent='center' xs={12} item>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                Log in 
                </Button>
              </Grid>
              <Grid container justifyContent='center'>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/sign-up' variant='body2'>
                    {"Don't have an account? Sign Up"}
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

export default LoginPage;
