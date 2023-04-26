import { UESR_REGEX } from '@/constants/regex.constant';
import { USER_ROLE, USER_STATUS } from '@/constants/user.contant';
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { upperFirst } from 'lodash';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import userService from '@/services/user.service';
import { useSnackbar } from 'notistack';
import useAuth from '@/hooks/useAuth';

const AddUserPage = () => {
  useAuth()
  const theme = useTheme();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: { role: 'user', status: 'active', email: '' },
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = useMutation(userService.addUser, {
    onSuccess: () => {
      enqueueSnackbar('User added', { variant: 'success' });
      reset();
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
  });

  const password = watch('password');

  const handleAddUser = (formData, e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <>
      <Typography component='h2' color={theme.palette.text.primary} variant='2' marginBottom={4}>
        Add User Form
      </Typography>
      <Box onSubmit={handleSubmit(handleAddUser)} component='form'>
        <Grid rowSpacing={4} columnSpacing={3} container>
          <Grid xs={12} item>
            <Typography variant='3' component='h3'>
              Login Details
            </Typography>
          </Grid>
          <Grid md={6} xs={12} item>
            <Controller
              rules={{ required: "Please enter user's username" }}
              name='username'
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  label='Username'
                  value={value || ''}
                  error={error ? true : false}
                  helperText={error?.message}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item>
            <Controller
              name='email'
              rules={{
                required: "Please enter user's email",
                pattern: { value: UESR_REGEX.EMAIL, message: 'Please enter a valid email' },
              }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  label='Email'
                  value={value || ''}
                  error={error ? true : false}
                  helperText={error?.message}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='password'
              rules={{
                required: "Please enter user's password",
                pattern: {
                  value: UESR_REGEX.PASSWORD,
                  message:
                    'Password must contain at least one capital letter, number and special character (!@#$%^&*)',
                },
              }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  type='password'
                  label='Password'
                  value={value || ''}
                  onChange={onChange}
                  error={error ? true : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='confirm_password'
              rules={{
                required: "Please confirm user's password",
                validate: (value) => value === password || 'Password do not match',
              }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  type='password'
                  label='Confirm Password'
                  value={value || ''}
                  error={error ? true : false}
                  helperText={error?.message}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='role'
              rules={{ required: "Please select user's role" }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  value={value || ''}
                  select
                  fullWidth
                  error={error ? true : false}
                  helperText={error?.message}
                  label='Role'
                  onChange={onChange}
                >
                  {Object.values(USER_ROLE).map((role) => (
                    <MenuItem key={role} value={role}>
                      {upperFirst(role)}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='status'
              rules={{ required: "Please select user's status" }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  value={value || ''}
                  select
                  fullWidth
                  label='Status'
                  error={error ? true : false}
                  helperText={error?.message}
                  onChange={onChange}
                >
                  {Object.values(USER_STATUS).map((role) => (
                    <MenuItem key={role} value={role}>
                      {upperFirst(role.split('-').join(' '))}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid xs={12} item>
            <Typography variant='3' component='h3'>
              Profile Details
            </Typography>
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.firstName'
              rules={{ required: "Please enter user's first name" }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  error={error ? true : false}
                  helperText={error?.message}
                  label='First Name'
                  value={value || ''}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.lastName'
              rules={{ required: "Please enter user's last name" }}
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  label='Last Name'
                  error={error ? true : false}
                  helperText={error?.message}
                  value={value || ''}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.contactEmail'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Contact Email'
                  value={value || ''}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.phoneNumber'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField label='Phone Number' value={value || ''} onChange={onChange} fullWidth />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.facebook'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField label='Facebook' value={value || ''} onChange={onChange} fullWidth />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.instagram'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField label='Instagram' value={value || ''} onChange={onChange} fullWidth />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.whatsapp'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField label='WhatsApp' value={value || ''} onChange={onChange} fullWidth />
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item>
            <Controller
              name='profile.snapchat'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField label='Snapchat' value={value || ''} onChange={onChange} fullWidth />
              )}
            />
          </Grid>

          <Grid xs={12} item>
            <Controller
              name='profile.aboutMe'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  multiline
                  minRows={2}
                  maxRows={5}
                  label='About me'
                  value={value || ''}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid xs={12} item>
            <Button disabled={isLoading} type='submit' variant='contained'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddUserPage;
