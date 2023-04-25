import { signIn } from "@/redux/thunks/user.thunk";
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
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        padding={(theme) => theme.spacing(3)}
        sx={{ borderRadius: 2 }}
        maxWidth={400}
      >
        <Typography
          variant="2"
          textAlign="center"
          component="h2"
          color={(theme) => theme.palette.primary.main}
        >
          Skill Matcher
        </Typography>
        <Typography variant="3" textAlign="center" component="h3">
          Log in
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <Grid gap={3} container>
            <Grid xs={12} item>
              {error && <Alert severity="error">{error.message}</Alert>}
            </Grid>
            <Grid xs={12} item>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {/* <Grid xs={12} item>
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
              </Grid> */}
            <Grid display="flex" justifyContent="center" xs={12} item>
              <Button type="submit" variant="contained" disabled={loading}>
                Log in
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid marginTop={4} container justifyContent="center">
          <Grid item xs={12}>
            <Link
              textAlign="center"
              href="#"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                textDecorationColor: (theme) => theme.palette.text.secondary,
              }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link
              href="/sign-up"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                textDecorationColor: (theme) => theme.palette.text.secondary,
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

LoginPage.getLayout = (page) => {
  return (
    <Box component="main" sx={{ height: "100vh", width: "100vw" }}>
      {page}
    </Box>
  );
};

export default LoginPage;
