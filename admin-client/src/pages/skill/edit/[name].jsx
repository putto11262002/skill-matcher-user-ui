import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import skillService from '../../../services/skill.service';
import { Stack, Typography } from '@mui/material';
import AddSkillForm from '../../../components/skill/AddSkillForm';
import Loader from '../../../components/common/Loader';
import useAuth from '@/hooks/useAuth';

const EditSkill = () => {
  useAuth()
  const [relatedSkillSearchTerm, setRelatedSkillsSearchTerm] = useState('');
  const router = useRouter();
  const { name } = router.query;

  const { isLoading, error, data } = useQuery(['skill', name], () => skillService.getSkill(name));

  const {
    isLoading: isLoadingSearchSkill,
    data: relatedSkillSuggestionData,
    refetch: handleSearchSkill,
  } = useQuery(['skill', 'related', relatedSkillSearchTerm], () =>
    skillService.searchSkill({ q: relatedSkillSearchTerm }),
    {enabled: false}
  );

  const { isLoading: isLoadingUpdateSkill, mutate: handleUpdateSkill } = useMutation(
    skillService.updateSkill,
  );

  useEffect(() => {
    if(relatedSkillSearchTerm !== '') handleSearchSkill()
  }, [relatedSkillSearchTerm])

  return (
    <Stack spacing={3}>
      <Typography variant='2' component='h2'>
        Edit Skill ({name})
      </Typography>
      {/* {isLoading ? (
        <Loader />
      ) : (
        <AddSkillForm
        isLoadingSaveSkill={isLoadingUpdateSkill}
        isLoadingSearchSkill={isLoadingSearchSkill}
        relatedSkillsSuggestions={relatedSkillSuggestionData?.data?.data}
          onSearchRelatedSkills={(searchTerm) => setRelatedSkillsSearchTerm(searchTerm)}
          type='edit'
          values={data?.data}
          onSaveSkill={(data) => handleUpdateSkill({name, payload: data})}
        />
      )} */}
    </Stack>
  );
};

export default EditSkill;
