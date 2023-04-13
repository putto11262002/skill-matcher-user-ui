import { Box, Grid, Stack, Typography, TextField , Button} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const EditUserProfileForm = ({ values, onSubmit, isLoadingValues , isLoadingSubmitting}) => {
  const { control, handleSubmit, reset } = useForm({ values });
  return (
    <Stack spacing={3}>
      <Typography variant='2' component='h2'>
        User Profile
      </Typography>
      <Box onSubmit={handleSubmit((data, e) => {
        e.preventDefault()
        reset()
        onSubmit(data)
        
      })} component='form'>
        <Grid rowSpacing={3} columnSpacing={3} container>
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
            <Button disabled={isLoadingSubmitting} type='submit' variant='contained'>
              Save
            </Button>
          </Grid>
        

        </Grid>

      </Box>
    </Stack>
  );
};

export default EditUserProfileForm;
