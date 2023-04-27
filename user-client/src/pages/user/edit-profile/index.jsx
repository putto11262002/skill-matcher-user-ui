import React, { useEffect, useState } from "react";

import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
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
import {
  Alert,
  Box,
  Grid,
  TextField,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import {enqueueSnackbar} from 'notistack'
function valuetext(value) {
  return `${value}%`;
}

/*  updating user schema
"username": "string",
"status": "string",
"profile": {
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "contactEmail": "string",
  "instagram": "string",
  "snapchat": "string",
  "facebook": "string",
  "whatsapp": "string",
  "aboutMe": "string"
  */

function EditSelfProfilePage() {
    const router = useRouter();
    const {id} = router.query;
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  //const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([{ name: "", level: 50 }]);
  const [about, setAbout] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [photo, setPhoto] = useState(null);
  const [nameError, setNameError] = useState("");
  const [lastError, setLastError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [facebookLink, setFaceBookLink] = useState(undefined);
  const [instagramLink, setInstagramLink] = useState(undefined);
  const [snapchatLink, setSnapchatLink] = useState(undefined);

  const {isLoading: isLoadingUser, refetch: fetchUser} = useQuery(['user', id],  userService.getSelf, { onSuccess: (res) => reset(res.data)})

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

  const { mutate: updateUser, isLoading: isLoadingSaveUser } = useMutation(userService.updateSelf, {
    onSuccess: () => {
      enqueueSnackbar("User added", { variant: "success" });
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const { handleSubmit, reset, control } = useForm();

  function handleAddSkill() {
    setSkills([...skills, { name: "", level: 50 }]);
  }

  const handleSaveProfile = (data) => {
    // data = {...data,profile: {...data.profile,  dateOfBirth: dayjs(data.profile.dateOfBirth).toISOString()}}
    updateUser(data)
  }

 

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Grid xs={11} sm={6} item>
        <Box
          padding={(theme) => theme.spacing(3)}
          sx={{ boxShadow: { sm: 2, xs: 0 }, borderRadius: 2 }}
          component='form'
          onSubmit={handleSubmit((data, e) => {
            e.preventDefault()
            handleSaveProfile(data)
          })}
        >
          <Typography
            variant="2"
            textAlign="center"
            component="h2"
            sx={{ marginBottom: 4 }}
          >
            Edit Profile
          </Typography>
          <Box marginTop={2} /> {/* Adds vertical space */}
          {/* <Box textAlign="center" display="flex" justifyContent="center" alignItems="center" color={(theme) => theme.palette.primary.main}>
                        <AccountCircleOutlinedIcon sx={{ fontSize: 70 }} />
                    </Box> */}
          {/* <Toolbar /> */}
          <Grid rowSpacing={3} columnSpacing={3} container>
            <Grid xs={12} item>
              <Controller
              rules={{required: {value: true, message: 'Please enter your first name'}}}
                control={control}
                name="profile.firstName"
                render={({ field: { value, onChange }, fieldState: {error} }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    label="First Name"
                    fullWidth
                    InputProps={{
                      endAdornment: <PortraitIcon />,
                    }}
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
                rules={{required: {value: true, message: 'Please enter your last name'}}}
                render={({ field: { value, onChange }, fieldState: {error} }) => (
                  <TextField
                    value={value || ""}
                    onChange={onChange}
                    label="Last Name"
                    fullWidth
                    InputProps={{
                      endAdornment: <PortraitIcon />,
                    }}
                    error={Boolean(error)}
                    helperText={error ? error.message : undefined}

                  />
                )}
              />
            </Grid>
{/* 
            <Grid xs={12} item>
              <Controller
              rules={{required: {value: true, message: 'Please select your date of birth'}}}
                name="profile.dateOfBirth"
                control={control}
                render={({ field: { value, onChange }, fieldState: {error} }) => (
                  <DatePicker
                  
                    onChange={onChange}
                    sx={{ width: "100%" }}
                    value={value || ''}
                    label="Date of Birth"
                    slotProps={{textField: {error: Boolean(error), helperText: error ? error.message : undefined}}}
            
                    
                  />
                )}
              />
            </Grid> */}

            <Grid xs={12} item>
              {/* <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="other">Prefer Not to Say</MenuItem>
                </Select>
              </FormControl> */}
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
                    {/* <MenuItem value="other">Prefer Not to Say</MenuItem> */}
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
                    // InputProps={{
                    //   endAdornment: <InfoIcon />,
                    // }}
                  />
                )}
              />
            </Grid>
{/* 
            <Grid xs={12} item>
              <Typography variant="3" component="h4">
                Social Media Details
              </Typography>
            </Grid> */}

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
                        <Link target="_blank" href={{pathname: facebookLink}}>{facebookLink}</Link>
                      ) : undefined
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
             <Controller name="profile.instagram" control={control} render={({field: {value, onChange}}) =>  <TextField
                value={value || ''}
                onChange={(e) => {
                    handleGenerateInstagramLink(e.target.value)
                    onChange(e)
                }}
                label="Instagram"
                fullWidth
                helperText={
                      instagramLink ? (
                        <Link target="_blank" href={{pathname: instagramLink}}>{instagramLink}</Link>
                      ) : undefined
                    }
                
              />
            }/>
            </Grid>

            <Grid item xs={12}>
            <Controller name="profile.snapchat" control={control} render={({field: {value, onChange}}) =>   <TextField
                value={value || ''}
                onChange={(e) => {
                    handleGenerateSnapchatLink(e.target.value)
                    onChange(e)
                }}
                label="Snapchat"
                fullWidth
                helperText={
                      snapchatLink ? (
                        <Link target="_blank" href={{pathname: snapchatLink}}>{snapchatLink}</Link>
                      ) : undefined
                    }
              />
             }/>
            </Grid>

            {/* <Grid xs={12} item>
              <label>
                Skills: <i>(please rate your knowledge)</i>
              </label>
              {skills.map((skill, index) => (
                <div key={index}>
                  <TextField
                    value={skill.name}
                    onChange={(event) => handleSkillNameChange(event, index)}
                    label={`Skill ${index + 1}`}
                    fullWidth
                    InputProps={{
                      endAdornment: <FormatPaintIcon />,
                    }}
                  />
                  <Box sx={{ width: 520 }}>
                    <Slider
                      defaultValue={50}
                      value={skill.level}
                      onChange={(event, newValue) =>
                        handleSkillLevelChange(event, newValue, index)
                      }
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                    />
                  </Box>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      Remove Skill
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddSkill}>
                Add Skill
              </button>
            </Grid> */}

            <Grid display="flex" justifyContent="center" xs={12} item>
              <Button type="submit" variant="contained" >
                Save
              </Button>
            </Grid>
            <Grid></Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditSelfProfilePage;
