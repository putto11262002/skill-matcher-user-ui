import React from 'react'
import {
    Autocomplete,
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
  } from '@mui/material';
  import { SKILL_STATUS } from '../../constants/skill.contant';
import { useForm, Controller } from 'react-hook-form';
import { upperFirst } from 'lodash';
const SkillForm = ({values, handleAddSkill, isLoadingAddSkill, isLoadingSearchSkill, onSearchRelatedSkills, relatedSkillsSuggestions}) => {

    const { control, handleSubmit, watch, reset } = useForm({values: values})
  return (
    <Stack spacing={3}>
    <Typography variant='2' component='h2'>
      Add Skill
    </Typography>
    <Box onSubmit={handleSubmit((data, e) => {
        e.preventDefault()
        reset()
        handleAddSkill(data)
        
    })} component='form'>
      <Grid rowSpacing={3} columnSpacing={3} container>
        <Grid xs={12} md={6} item>
          <Controller
            rules={{ required: { value: true, message: 'Please enter a skill name' } }}
            control={control}
            name='name'
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                error={error ? true : false}
                helperText={error?.message}
                onChange={onChange}
                value={value || ''}
                fullWidth
                label='Name'
              />
            )}
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <Controller
            rules={{ required: { value: true, message: 'Please select a status' } }}
            control={control}
            name='status'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={error ? true : false}
                helperText={error?.message}
                select
                onChange={onChange}
                value={value || ''}
                fullWidth
                label='Status'
              >
                {Object.values(SKILL_STATUS).map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {upperFirst(skill)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid xs={12} item>
          <Controller
            control={control}
            name='description'
            render={({ field: { value, onChange } }) => (
              <TextField
                multiline
                minRows={2}
                maxRows={4}
                onChange={onChange}
                value={value || ''}
                fullWidth
                label='Description'
              ></TextField>
            )}
          />
        </Grid>

        <Grid xs={12} item>
          <Controller
            control={control}
            name='relatedSkills'
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                loading={isLoadingSearchSkill}
                onChange={(e, value) => onChange(value)}
                value={value || []}
                multiple
                freeSolo
                filterOptions={(options) => options.map((option) => option.name)}
                options={relatedSkillsSuggestions || []}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => onSearchRelatedSkills(e.target.value)}
                    {...params}
                    InputProps={{ ...params.InputProps, type: 'text' }}
                    fullWidth
                    label='Related Skills'
                  ></TextField>
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button disabled={isLoadingAddSkill} variant='contained' type='submit'>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Stack>
  )
}

export default SkillForm