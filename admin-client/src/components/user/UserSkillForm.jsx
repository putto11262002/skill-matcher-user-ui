import { ThumbDown, ThumbUp } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Grid,
  Stack,
  TextField,
  Slider,
  Typography,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import userService from '../../services/user.service';
import { USER_SKILL_ROLE, USER_SKILL_TABLE_COLUMNS } from '../../constants/user.contant';
import { upperFirst } from 'lodash';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
const UserSkillForm = ({
  onSearchSkill,
  skillSuggestions,
  isLoadingSearchSkill,
  onAddSkill,
  isLoadingAddSkill,
  skills,
  isLoadingSkills,
  errorLoadingSkills,
  isLoadingUpdateSkill,
  onUpdateSkill,
  onDeleteSkill,
}) => {
  const [formDialog, setFormDialog] = useState({ open: false, type: undefined, values: {} });

  return (
    <>
      <FormDialog
        values={formDialog.values}
        open={formDialog.open}
        onClose={() => setFormDialog({ open: false, type: undefined, values: {} })}
        type={formDialog.type}
        onSearchSkill={onSearchSkill}
        isLoadingSearchSkill={isLoadingSearchSkill}
        skillSuggestions={skillSuggestions}
        isLoadingSaveSkill={formDialog.type === 'add' ? isLoadingAddSkill : isLoadingUpdateSkill}
        onSave={(data) => (formDialog.type === 'add' ? onAddSkill(data) : onUpdateSkill(data))}
      />
      <Stack>
        <Typography variant='2' component='h2' marginBottom={3}>
          Skills
        </Typography>
        <Box>
          <Button
            variant='contained'
            onClick={() => setFormDialog({ open: true, type: 'add', values: {} })}
          >
            Add
          </Button>
        </Box>

        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {USER_SKILL_TABLE_COLUMNS.map((column) => (
                <TableCell key={column}>{upperFirst(column)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoadingSkills &&
              !errorLoadingSkills &&
              skills.map((skill) => (
                <TableRow key={skill.skill}>
                  {USER_SKILL_TABLE_COLUMNS.map((column) => {
                    if (column !== 'actions') {
                      return <TableCell key={skill.skill + column}>{skill[column]}</TableCell>;
                    }
                    return (
                      <TableCell key={skill.skill + column}>
                        <Stack direction='row' spacing={2}>
                          {' '}
                          <div
                            onClick={() =>
                              setFormDialog({ type: 'edit', open: true, values: skill })
                            }
                          >
                            <EditIcon fontSize='s' />
                          </div>
                          <div onClick={() => onDeleteSkill(skill)}>
                            <DeleteIcon fontSize='s' />
                          </div>
                        </Stack>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Stack>
    </>
  );
};

const FormDialog = ({
  onClose,
  open,
  type,
  onSave,
  skillSuggestions,
  isLoadingSaveSkill,
  isLoadingSearchSkill,
  onSearchSkill,
  values,
}) => {
  const { control, handleSubmit, reset } = useForm({ values: values });
  const handleClose = () => {
    // clear search term
    onSearchSkill('');
    onClose();
  };

  useEffect(() => {
    if (open) reset();
  }, [open]);

  return (
    <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{upperFirst(type)} User Skill</DialogTitle>
      <DialogContent>
        <Box
          onSubmit={handleSubmit((data, e) => {
            e.preventDefault();

            onSave(data);
            handleClose();
          })}
          component='form'
        >
          <Grid rowSpacing={3} columnSpacing={3} container paddingY={2}>
            <Grid xs={12} md={6} item>
              <Controller
                rules={{ required: { value: true, message: 'Please select your skill' } }}
                name='skill'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    loading={isLoadingSearchSkill}
                    freeSolo
                    onChange={(e, value) => onChange(value)}
                    value={value || ''}
                    options={skillSuggestions || []}
                    filterOptions={(options) => options.map((option) => option.name)}
                    disabled={type === 'edit'}
                    renderInput={(params) => (
                      <TextField
                        error={error ? true : false}
                        helperText={error?.message}
                        onChange={(e) => onSearchSkill(e.target.value)}
                        label='Skill'
                        fullWidth
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        {...params}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} md={6} item>
              <Controller
                rules={{ required: { value: true, message: 'Please select your role' } }}
                control={control}
                name='role'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    disabled={type === 'edit'}
                    error={error ? true : false}
                    helperText={error?.message}
                    value={value || ''}
                    onChange={onChange}
                    fullWidth
                    select
                    label='Role'
                  >
                    {Object.values(USER_SKILL_ROLE).map((role) => (
                      <MenuItem value={role} key={role}>
                        {upperFirst(role)}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 3 }} item>
              <Typography>Beginner</Typography>
              <Controller
                name='proficiency'
                control={control}
                rules={{ required: { value: true, message: 'Please select your proficiency' } }}
                render={({ field: { onChange, value } }) => (
                  <Slider
                    label='Proficiency'
                    marks
                    onChange={onChange}
                    value={value || 0}
                    step={1}
                    min={0}
                    max={10}
                  />
                )}
              />
              <Typography>Advanced</Typography>
            </Grid>

            <Grid xs={12} item>
              <Controller
                control={control}
                name='about'
                render={({ field: { value, onChange } }) => (
                  <TextField fullWidth label="About" onChange={onChange} value={value} multiline minRows={2} maxRows={4} />
                )}
              ></Controller>
            </Grid>
            <Grid xs={12} item>
              <Stack direction='row' spacing={3}>
                <Button disabled={isLoadingSaveSkill} type='sumbit' variant='contained'>
                  Save
                </Button>
                <Button variant='contained' onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserSkillForm;
