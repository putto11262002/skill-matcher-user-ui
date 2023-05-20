import { signUp } from "@/redux/thunks/user.thunk";
import {
  Alert,
  Box,
  Grid,
  TextField,
  Toolbar,
  Typography,
  Button,
  Link,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/services/auth.service";
import AuthLayout from "@/components/common/layout/AuthLayout";
import { Controller, useForm } from "react-hook-form";
import { UESR_REGEX } from "@/constants/regex.constant";

const SignUpPage = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState(undefined);
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const { handleSubmit, control, watch } = useForm();
  const password = watch("password");
  const { mutate, isLoading: isLoadingSignUp } = useMutation(
    authService.signUp,
    {
      onSuccess: (res) => {
        setAlertMessage({ message: "Sign up successful", variant: "success" });
        setTimer(setTimeout(() => router.push("/login")));
      },
      onError: (err) =>
        setAlertMessage({ message: err.message, variant: "error" }),
    }
  );

  const handleSignUp = (formData, e) => {
    e.preventDefault();
    mutate(formData);
  };

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push("/");
    }
  }, [loading, isLoggedIn]);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Logo icon */}
      <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/images/logoIcon.png" alt="Logo" style={{ height: "100", width: "110px" }} />
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
        Sign Up
      </Typography>

      {Boolean(alertMessage) && (
        <Alert sx={{ marginTop: 2 }} severity={alertMessage.variant}>
          {alertMessage.message}
        </Alert>
      )}

      <Box marginTop={3} onSubmit={handleSubmit(handleSignUp)} component="form">
        <Grid spacing={3} container>
          <Grid xs={12} md={6} item>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Please enter your first name",
                },
              }}
              name="firstName"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  error={Boolean(error)}
                  helperText={error?.message}
                  value={value || ""}
                  onChange={onChange}
                  label="First name"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Please enter your last name",
                },
              }}
              name="lastName"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  error={Boolean(error)}
                  helperText={error?.message}
                  value={value || ""}
                  onChange={onChange}
                  label="Last name"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={12} item>
            <Controller
              name="username"
              rules={{
                required: {
                  value: true,
                  message: "Please enter your username",
                },
                minLength: {
                  value: 6,
                  message: "Username must be longer than 6 chatacters",
                },
              }}
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  error={Boolean(error)}
                  helperText={error?.message}
                  value={value || ""}
                  onChange={onChange}
                  label="Username"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={12} item>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Please enter your email",
                pattern: {
                  value: UESR_REGEX.EMAIL,
                  message: "Please enter a valid email",
                },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  error={Boolean(error)}
                  helperText={error?.message}
                  value={value || ""}
                  onChange={onChange}
                  label="Email"
                  type="email"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={12} item>
            <Controller
              rules={{
                required: "Please enter your password",
                pattern: {
                  value: UESR_REGEX.PASSWORD,
                  message:
                    "Password must contain at least one capital letter, number and special character (!@#$%^&*)",
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
                  helperText={error?.message}
                  value={value || ""}
                  onChange={onChange}
                  label="Password"
                  type="password"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="confirmedPassword"
              control={control}
              rules={{
                required: "Please confirm user password",
                validate: (value) =>
                  value === password || "Password do not match",
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  error={Boolean(error)}
                  helperText={error?.message}
                  value={value || ""}
                  onChange={onChange}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid display="flex" justifyContent="center" xs={12} item>
            <Button type="submit" variant="contained" disabled={loading}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Stack spacing={1} marginTop={4}>
        <Grid>
          <Link href="/login">
            <Typography
              color={(theme) => theme.palette.text.secondary}
              variant="subtitle2"
              component="p"
              textAlign="left"
            >
              Already have an account? Log In
            </Typography>
          </Link>
        </Grid>
      </Stack>
    </>
  );
};

SignUpPage.getLayout = AuthLayout;

export default SignUpPage;
