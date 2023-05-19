import React, { useEffect, useState } from 'react';
import EditUserProfileForm from '../../../components/user/UserProfileForm';
import UserSkillForm from '../../../components/user/UserSkillForm';
import { Box, Button, Divider, Stack, Toolbar } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { useRouter } from 'next/router';
import skillService from '../../../services/skill.service';
import { useSnackbar } from 'notistack';
import UserAvatarForm from '../../../components/user/UserAvatarForm';
import useAuth from '@/hooks/useAuth';

// TODO - add error messages
const EditUserPage = () => {
  useAuth();
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState({});
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();

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
      onError: () => {
        router.push('/user');
      },
    },
  );

  // Define query for fetching user skills
  const {
    isLoading: isLoadingSkills,
    refetch: fetchSkills,
    error: errorLoadingSkills,
  } = useQuery(['user', id, 'skills'], () => userService.getUserSkills({ userId: id, query: {} }), {
    enabled: false,
    onSuccess: (res) => setSkills(res.data?.data),
  });

  // Define mutation for add user skill
  const { mutate: handleAddSkill, isLoading: isLoadingAddSkill } = useMutation(
    userService.addSkill,
    {
      onSuccess: (res) => {
        setSkills((prevSkills) => [...prevSkills, res.data]);
        enqueueSnackbar('Skill added', { variant: 'success' });
      },
    },
  );

  // Define mutation for update user skill
  const { mutate: handleUpdateSkill, isLoading: isLoadingUpdateSkill } = useMutation(
    userService.updateUserSkill,
    {
      onSuccess: (res, { id, skill: skillName, payload }) => {
        setSkills((prevSkills) => [
          ...prevSkills.map((skill) => (skill.skill !== skillName ? skill : payload)),
        ]);
        enqueueSnackbar('Skill updated', { variant: 'success' });
      },
    },
  );

  const { mutate: handleDeleteSkill } = useMutation(userService.deleteUserSkill, {
    onSuccess: (res, { id, skill: skillName }) => {
      setSkills((prevSkills) => prevSkills.filter((skill) => skill.skill !== skillName));
      enqueueSnackbar('Skill deleted', { variant: 'success' });
    },
  });
  // Define query for searching skills
  const {
    data: skillSuggestions,
    refetch: handleSearchSkill,
    isLoading: isLoadingSearchSkill,
  } = useQuery(
    ['skills', skillSearchTerm],
    () => skillService.searchSkill({ q: skillSearchTerm }),
    { enabled: false },
  );

  // Define mutation for updating user profile
  const { mutate: handleUpdateUserProfile, isLoading: isLoadingUpdateUserProfile } = useMutation(
    userService.updateUser,
    {
      onSuccess: (res, { payload, id }) => {
        setUser(payload);
        enqueueSnackbar('Profile updated', { variant: 'success' });
      },
    },
  );

  const {
    mutate: handleUploadAvatar,
    isLoading: isLoadingUpdateAvatar,
    error: updateAvatarError,
  } = useMutation(userService.updateUserAvatar, {
    onSuccess: () => enqueueSnackbar('Image uploaded', { variant: 'success' }),
  });


  // Define mutation for delete user
  const {
    mutate: handleDeleteUser
  } = useMutation(
    userService.deleteUser,
    {
      onSuccess: (res) => {
        enqueueSnackbar('User deleted', {variant: 'success'});
        router.push('/user');
      },
      onError: (err) => {
        enqueueSnackbar(err.message, {variant: 'error'})
      }
    }
  )

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
    <Stack spacing={6}>
      <EditUserProfileForm
        values={user}
        onSubmit={(user) => handleUpdateUserProfile({ id: user._id, payload: user })}
        isLoadingSubmitting={isLoadingUpdateUserProfile}
      />
      <UserAvatarForm
        avatar={user?.avatar}
        onUpload={(file) => handleUploadAvatar({ id: user._id, file })}
        loading={isLoadingUpdateAvatar}
        error={updateAvatarError}
      />
      <UserSkillForm
        skills={skills}
        isLoadingSkills={isLoadingSkills}
        skillSuggestions={skillSuggestions?.data?.data}
        onSearchSkill={(searchTerm) => setSkillSearchTerm(searchTerm)}
        onAddSkill={(formData) => handleAddSkill({ id: user._id, payload: formData })}
        isLoadingAddSkill={isLoadingAddSkill}
        errorLoadingSkills={errorLoadingSkills}
        isLoadingUpdateSkill={isLoadingUpdateSkill}
        isLoadingSearchSkill={isLoadingSearchSkill}
        onUpdateSkill={(formData) =>
          handleUpdateSkill({ id: user._id, payload: formData, skill: formData.skill })
        }
        onDeleteSkill={(skill) => handleDeleteSkill({ id: user._id, skill: skill.skill })}
      />
      <Box>
        <Button onClick={() => handleDeleteUser(user._id)} variant='contained' color='error'>
          Delete User
        </Button>
      </Box>
    </Stack>
  );
};

export default EditUserPage;
