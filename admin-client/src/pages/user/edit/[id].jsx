import React, { useEffect, useState } from 'react';
import EditUserProfileForm from '../../../components/user/UserProfileForm';
import UserSkillForm from '../../../components/user/UserSkillForm';
import { Divider, Toolbar } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { useRouter } from 'next/router';
import skillService from '../../../services/skill.service';
import { useSnackbar } from 'notistack';

const EditUserPage = () => {
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState({});
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const {enqueueSnackbar} = useSnackbar()

  // Extract user id from query
  const router = useRouter();
  const { id } = router.query;

  // Define query for fetching user
  const { isLoading: isLoadingUser, refetch: fetchUser } = useQuery(
    ['user', id],
    () => userService.getUserById(id),
    {
      enabled: false,
      onSuccess: (res) => {
        setUser(res.data);
      },
    },
  );

  // Define query for fetching user skills
  const { isLoading: isLoadingSkills, refetch: fetchSkills, error: errorLoadingSkills } = useQuery(
    ['user', id, 'skills'],
    () => userService.getUserSkills(id),
    { enabled: false, onSuccess: (res) => setSkills(res.data) },
  );

  // Define mutation for add user skill
  const { mutate: handleAddSkill, isLoading: isLoadingAddSkill } = useMutation(
    userService.addSkill,
    {
      onSuccess: (res) => {
        setSkills(prevSkills => [...prevSkills, res.data])
        enqueueSnackbar('Skill added', {variant: 'success'})
      },
    },
  );

  // Define mutation for update user skill
  const {mutate: handleUpdateSkill, isLoading: isLoadingUpdateSkill} = useMutation(userService.updateUserSkill, 
    {
      onSuccess: (res, {id, skill: skillName, payload}) => {
        setSkills(prevSkills => [...prevSkills.map(skill => skill.skill !== skillName  ? skill : payload)])
        enqueueSnackbar('Skill updated', {variant: 'success'})
      }
    })

    const {mutate: handleDeleteSkill} = useMutation(userService.deleteUserSkill,
      {
        onSuccess: (res, {id, skill: skillName}) => {
          setSkills(prevSkills => prevSkills.filter(skill => skill.skill !== skillName))
          enqueueSnackbar('Skill deleted', {variant: 'success'})
        }
      })
  // Define query for searching skills
  const { data: skillSuggestions, refetch: handleSearchSkill, isLoading: isLoadingSearchSkill } = useQuery(
    ['skills', skillSearchTerm],
    () => skillService.searchSkill({ q: skillSearchTerm }),
    { enabled: false },
  );

  // Fetch user and skills when id is available
  useEffect(() => {
    if (id) {
      fetchUser();
      fetchSkills();
    }
  }, [id]);

  // search when whenever the search term changes
  useEffect(() => {
    if (skillSearchTerm !== '') {
      handleSearchSkill();
    }
  }, [skillSearchTerm]);

  return (
    <>
      <EditUserProfileForm />
      <Toolbar />
      <UserSkillForm
      skills={skills}
      isLoadingSkills={isLoadingSkills}
        skillSuggestions={skillSuggestions?.data?.data}
        onSearchSkill={(searchTerm) => setSkillSearchTerm(searchTerm)}
        onAddSkill={(formData) => handleAddSkill({id: user._id, payload: formData})}
        isLoadingAddSkill={isLoadingAddSkill}
        errorLoadingSkills={errorLoadingSkills}
        isLoadingUpdateSkill={isLoadingUpdateSkill}
        isLoadingSearchSkill={isLoadingSearchSkill}
        onUpdateSkill={(formData) => handleUpdateSkill({id: user._id, payload: formData, skill: formData.skill})}
        onDeleteSkill={(skill) => handleDeleteSkill({id: user._id, skill: skill.skill})}
      />
    </>
  );
};

export default EditUserPage;