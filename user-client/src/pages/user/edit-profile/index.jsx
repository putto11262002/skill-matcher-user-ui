import React, { useEffect, useState } from "react";

import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useRouter } from "next/router";
import { Avatar, Stack } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import PortraitIcon from "@mui/icons-material/Portrait";
import CakeIcon from "@mui/icons-material/Cake";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import skillService from "@/services/skill.service";
import {
  Alert,
  Box,
  Grid,
  TextField,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import UserSkillForm from "@/components/user/skills/UserSkillForm";
import UserAvatarForm from "@/components/user/UserAvatarForm";
import { updateUser } from "@/redux/slices/auth.slice";
function valuetext(value) {
  return `${value}%`;
}

function EditSelfProfilePage() {
  const router = useRouter();
  const { user: authUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch()

  const [skills, setSkills] = useState([]);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");

  const [facebookLink, setFaceBookLink] = useState(undefined);
  const [instagramLink, setInstagramLink] = useState(undefined);
  const [snapchatLink, setSnapchatLink] = useState(undefined);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { refetch: fetchUser } = useQuery(
    ["user", authUser?._id],
    userService.getSelf,
    {
      onSuccess: (res) => {
        reset(res.data)
        setUser(res.data)
      }, enabled: false
    }
  );

  const handleGenerateFacebookLink = (value) => {
    if (value === "" || value === undefined) setFaceBookLink(undefined);
    else setFaceBookLink(`https://www.facebook.com/${value}`);
  };

  const handleGenerateInstagramLink = (value) => {
    if (value === "" || value === undefined) setInstagramLink(undefined);
    else setInstagramLink(`https://www.instagram.com/${value}`);
  };

  const handleGenerateSnapchatLink = (value) => {
    if (value === "" || value === undefined) setSnapchatLink(undefined);
    else setSnapchatLink(`https://www.snapchat.com/${value}`);
  };

  const { mutate: updateUserProfile, isLoading: isLoadingSaveUser } = useMutation(
    userService.updateSelf,
    {
      onSuccess: () => {
        dispatch(updateUser(user))
        enqueueSnackbar("User added", { variant: "success" });
      },
      onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
    }
  );

  // Define query for fetching user skills
  const {
    isLoading: isLoadingSkills,
    error: errorLoadingSkills,
    refetch: fetchSkills,
  } = useQuery(
    ["user", authUser?._id, "skills"],
    () => userService.getUserSkills({ userId: authUser._id, query: {} }),
    { onSuccess: (res) => setSkills(res.data?.data), enabled: false }
  );

  // Define mutation for add user skill
  const { mutate: handleAddSkill, isLoading: isLoadingAddSkill } = useMutation(
    userService.addSkill,
    {
      onSuccess: (res) => {
        setSkills((prevSkills) => [...prevSkills, res.data]);
        enqueueSnackbar("Skill added", { variant: "success" });
      },
      onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
    }
  );

  // Define mutation for update user skill
  const { mutate: handleUpdateSkill, isLoading: isLoadingUpdateSkill } =
    useMutation(userService.updateSelfSkill, {
      onSuccess: (res, { id, skill: skillName, payload }) => {
        setSkills((prevSkills) => [
          ...prevSkills.map((skill) =>
            skill.skill !== skillName ? skill : payload
          ),
        ]);
        enqueueSnackbar("Skill updated", { variant: "success" });
      },
    });

  const { mutate: handleDeleteSkill } = useMutation(userService.deleteSkill, {
    onSuccess: (res, skillName) => {
      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.skill !== skillName)
      );
      enqueueSnackbar("Skill deleted", { variant: "success" });
    },
  });

  // Define query for searching skills
  const {
    data: skillSuggestions,
    refetch: handleSearchSkill,
    isLoading: isLoadingSearchSkill,
  } = useQuery(
    ["skills", skillSearchTerm],
    () => skillService.searckSkill({ q: skillSearchTerm }),
    { enabled: false }
  );

  const { handleSubmit, reset, control } = useForm();

  const handleDeleteConfirmation = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteAccount = async () => {
    try {
      // Perform the delete account operation
      await userService.deleteSelf();
      enqueueSnackbar('User deleted', { variant: 'success' });
      router.push('/landing');
    } catch (error) {
      console.error('Error deleting user:', error);
      enqueueSnackbar('Error deleting user', { variant: 'error' });
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const {
    mutate: handleUploadAvatar,
    isLoading: isLoadingUpdateAvatar,
    error: updateAvatarError,
  } = useMutation(userService.updateAvatar, {
    onSuccess: (res) => {
      dispatch(updateUser({ ...user, avatar: res?.data }))
      setUser({ ...user, avatar: res?.data })
      enqueueSnackbar("Image uploaded", { variant: "success" })
    },
  });

  useEffect(() => {
    if (authUser?._id) {
      fetchUser();
      fetchSkills();
    }
  }, [authUser?._id]);

  const handleUpdateUserProfile = (data) => {
    setUser(data);
    updateUserProfile(data);
  }

  // search when whenever the search term changes
  useEffect(() => {
    if (skillSearchTerm !== "") {
      handleSearchSkill();
    }
  }, [skillSearchTerm]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Stack spacing={4} maxWidth={600} sx={{ width: "100%" }}>
        <Box
          sx={{}}
          component="form"
          onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            handleUpdateUserProfile(data)
          })}
        >
          <Box marginTop={2} />

          <UserAvatarForm
            avatar={user?.avatar}
            onUpload={(file) => handleUploadAvatar(file)}
            loading={isLoadingUpdateAvatar}
            error={updateAvatarError}
          />
          <Grid marginTop={2}>
            <UserSkillForm
              skills={skills}
              isLoadingSkills={isLoadingSkills}
              skillSuggestions={skillSuggestions?.data?.data}
              onSearchSkill={(searchTerm) => setSkillSearchTerm(searchTerm)}
              onAddSkill={(formData) =>
                handleAddSkill({ id: authUser._id, ...formData })
              }
              isLoadingAddSkill={isLoadingAddSkill}
              errorLoadingSkills={errorLoadingSkills}
              isLoadingUpdateSkill={isLoadingUpdateSkill}
              isLoadingSearchSkill={isLoadingSearchSkill}
              onUpdateSkill={(formData) =>
                handleUpdateSkill({
                  payload: formData,
                  skill: formData.skill,
                })
              }
              onDeleteSkill={(skill) => handleDeleteSkill(skill.skill)}
            />
          </Grid>
          <Typography
            variant="2"
            textAlign="flex-start"
            component="h2"
            marginTop={2}
            sx={{ marginBottom: 4 }}
          >
            User Details
          </Typography>
          <Grid rowSpacing={3} columnSpacing={3}  container>
            <Grid xs={12} item>
              <Controller
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your first name",
                  },
                }}
                control={control}
                name="profile.firstName"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    label="First Name"
                    fullWidth
                    // InputProps={{
                    //   endAdornment: <PortraitIcon />,
                    // }}
                    error={Boolean(error)}
                    helperText={error ? error.message : undefined}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} item>
              <Controller
                control={control}
                name="profile.lastName"
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your last name",
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    label="Last Name"
                    fullWidth
                    // InputProps={{
                    //   endAdornment: <PortraitIcon />,
                    // }}
                    error={Boolean(error)}
                    helperText={error ? error.message : undefined}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} item>
              <Controller
                name="profile.gender"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    onChange={onChange}
                    value={value || ""}
                  >
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid xs={12} item>
              <Controller
                name="profile.aboutMe"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    label="About You"
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={4}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="profile.facebook"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ""}
                    onChange={(e) => {
                      handleGenerateFacebookLink(e.target.value);
                      onChange(e);
                    }}
                    label="Facebook"
                    fullWidth
                    helperText={
                      facebookLink ? (
                        <Link target="_blank" href={{ pathname: facebookLink }}>
                          {facebookLink}
                        </Link>
                      ) : undefined
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="profile.instagram"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ""}
                    onChange={(e) => {
                      handleGenerateInstagramLink(e.target.value);
                      onChange(e);
                    }}
                    label="Instagram"
                    fullWidth
                    helperText={
                      instagramLink ? (
                        <Link
                          target="_blank"
                          href={{ pathname: instagramLink }}
                        >
                          {instagramLink}
                        </Link>
                      ) : undefined
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="profile.snapchat"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ""}
                    onChange={(e) => {
                      handleGenerateSnapchatLink(e.target.value);
                      onChange(e);
                    }}
                    label="Snapchat"
                    fullWidth
                    helperText={
                      snapchatLink ? (
                        <Link target="_blank" href={{ pathname: snapchatLink }}>
                          {snapchatLink}
                        </Link>
                      ) : undefined
                    }
                  />
                )}
              />
            </Grid>

            <Grid display="flex" justifyContent="flex-end" xs={12} item>
              <Button type="submit" variant="contained" sx={{ width: "unset" }}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>

      </Stack>
      <Grid marginTop={5}>
        <Grid item>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" color="error" onClick={handleDeleteConfirmation}>
              Delete Account
            </Button>
          </Box>
        </Grid>
        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle color="error" fontWeight="bold">Delete Account</DialogTitle>
          <DialogContent>
            <Typography variant="body1" fontWeight="bold">
              Are you sure you want to delete your account?
            </Typography>
            <Typography variant="body2">
              This action cannot be undone.
            </Typography>
            {/*} <TextField
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               />*/}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="error">
              Cancel
            </Button>
            <Button onClick={handleDeleteAccount} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box >
  );
}

export default EditSelfProfilePage;
