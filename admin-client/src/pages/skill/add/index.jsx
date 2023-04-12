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
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SKILL_STATUS } from '../../../constants/skill.contant';
import { upperFirst } from 'lodash';
import skillService from '../../../services/skill.service';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import authService from '../../../services/auth.service';
import SkillForm from '../../../components/skill/SkillForm';

// TODO - implement infinite scrolling for search related skills
// TODO - implement request cancalling for search
const AddSkillPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [relatedSkillsSearch, setRelatedSkillsSearch] = useState('');
  // const [relatedSkillsSuggestions, setRelatedSkillsSuggestions] = useState([]);



  const { isLoading: isLoadingAddSkill, mutate } = useMutation(skillService.addSkill, {
    onSuccess: () => {
      enqueueSnackbar('Skill added', { variant: 'success' });
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
  });

  const {
    refetch,
    isLoading: isLoadingSearchSkill,
    data,
  } = useQuery(
    ['skills', relatedSkillsSearch],
    () => skillService.searchSkill({ q: relatedSkillsSearch }),
    { enabled: false, onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }) },
  );

  const handleAddSkill = async (formData) => {
   
    mutate(formData);
  };

  useEffect(() => {
    if (relatedSkillsSearch !== '') {
      refetch();
    }
  }, [relatedSkillsSearch]);

  return (
   <SkillForm values={{}} relatedSkillsSuggestions={data?.data?.data} onSearchRelatedSkills={(searchTerm) => setRelatedSkillsSearch(searchTerm)}  handleAddSkill={handleAddSkill} isLoadingAddSkill={isLoadingAddSkill} isLoadingSearchSkill={isLoadingSearchSkill} />
  );
};

export default AddSkillPage;
