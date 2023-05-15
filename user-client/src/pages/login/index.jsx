import AuthLayout from "@/components/common/layout/AuthLayout";
import { signIn } from "@/redux/thunks/user.thunk";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const setError = (error) => ({
  type: "auth/set-error",
  payload: error,
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, loading, error } = useSelector((state) => state.auth);
  const { control, handleSubmit } = useForm();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async ({ usernameOrEmail, password }, e) => {
    e.preventDefault();
    dispatch(signIn({ usernameOrEmail, password }));
    // check if email and password are provided
    // if (!email || !password) {
    //   setErrorMessage("Please enter your email and password");
    //   return;
    // }
    // const result = await dispatch(signIn({ email, password }));
    // if (signIn.rejected.match(result)) {
    //   const error = result.payload;
    //   // dispatch an action to update the error state
    //   dispatch(setError(error));
    // } else {
    //   // login successful, redirect to home page
    //   router.push("/");
    // }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      {/* Logo icon */}
      <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/images/logoIcon.png" alt="Logo" style={{ height: "100px", width:"110px" }} />
      </Box>
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
      {error && (
        <Alert sx={{ marginTop: 2 }} severity="error">
          {error.message}
        </Alert>
      )}
      <Box marginTop={3} component="form" onSubmit={handleSubmit(handleLogin)}>
        <Grid spacing={3} container>
          <Grid xs={12} item>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Please enter your username or email",
                },
              }}
              name="usernameOrEmail"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  error={Boolean(error)}
                  helperText={error ? error.message : undefined}
                  fullWidth
                  label="Username or Email"
                  autoFocus
                  value={value || ""}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid xs={12} item>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Please enter your password",
                },
              }}
              name="password"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  error={Boolean(error)}
                  helperText={error ? error.message : undefined}
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={value || ""}
                  onChange={onChange}
                />
              )}
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

      <Stack marginTop={4} spacing={1}>
        <Link textAlign="center" href="#" sx={{}}>
          <Typography
            color={(theme) => theme.palette.text.secondary}
            variant="subtitle2"
            component="p"
            textAlign="left"
          >
            Forgot password?
          </Typography>
        </Link>

        <Link href="/sign-up" sx={{}}>
          <Typography
            color={(theme) => theme.palette.text.secondary}
            variant="subtitle2"
            component="p"
            textAlign="left"
          >
            Don't have an account? Sign Up
          </Typography>
        </Link>
      </Stack>
    </>
  );
};

LoginPage.getLayout = AuthLayout

export default LoginPage;
