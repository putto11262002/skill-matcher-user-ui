import React, { useState } from 'react';
//import './App.css';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import { Avatar } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import PortraitIcon from '@mui/icons-material/Portrait';
import CakeIcon from '@mui/icons-material/Cake';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';


import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import authService from '@/services/auth.service';
import userService from '@/services/user.service';
import {
    Alert,
    Box,
    Grid,
    TextField,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import useAuth from '@/hooks/useAuth';


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

function ProfileCreation() {
    useAuth()
    const [name, setName] = useState('');
    const [last, setLast] = useState('');
    //const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState([{ name: '', level: 50 }]);
    const [about, setAbout] = useState('');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [photo, setPhoto] = useState(null);
    const [nameError, setNameError] = useState('');
    const [lastError, setLastError] = useState('');
    const [dateOfBirthError, setDateOfBirthError] = useState('');
    const [genderError, setGenderError] = useState('');



    const { mutate, isLoading } = useMutation(() => userService.updateSelf, {
        onSuccess: () => {
            enqueueSnackbar('User added', { variant: 'success' });
            reset();
        },
        onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    });


    function handleNameChange(event) {
        setName(event.target.value);
        setNameError('');
    }

    function handleLastChange(event) {
        setLast(event.target.value);
        setLastError('');
        setDateOfBirthError('');
    }

    function handleUsernameChange(event) {
        setName(event.target.value);
    }

    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    };

    function handleTwitterChange(event) {
        setTwitter(event.target.value);
    }
    function handleFacebookChange(event) {
        setFacebook(event.target.value);
    }

    function handleInstagramChange(event) {
        setInstagram(event.target.value);
    }

    function handleGenderChange(event) {
        setGender(event.target.value);
        setGenderError('');
    }

    function handleSkillNameChange(event, index) {
        const newSkills = [...skills];
        newSkills[index].name = event.target.value;
        setSkills(newSkills);
    }

    function handleSkillLevelChange(event, newValue, index) {
        const newSkills = [...skills];
        newSkills[index].level = newValue;
        setSkills(newSkills);
    }

    function handleAddSkill() {
        setSkills([...skills, { name: '', level: 50 }]);
    }

    function handleRemoveSkill(index) {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    }

    function handleAboutChange(event) {
        setAbout(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    const generateProfileLink = (username, platform) => {
        if (!username) return '';
        switch (platform) {
            case 'instagram':
                return `https://www.instagram.com/${username}`;
            case 'facebook':
                return `https://www.facebook.com/${username}`;
            case 'twitter':
                return `https://www.snapchat.com/${username}`;
            default:
                return '';
        }
    };


    return (
        <Grid container justifyContent='center' alignItems='center' height='100%'>
            <Grid xs={11} sm={6} item>
                <Box
                    padding={(theme) => theme.spacing(3)}
                    sx={{ boxShadow: { sm: 2, xs: 0 }, borderRadius: 2 }}
                >

                    <Typography
                        variant="2"
                        textAlign="center"
                        component="h2"
                   
                    >
                          Profile Creation
                    </Typography>
                    <Box marginTop={2} /> {/* Adds vertical space */}
                    <Box textAlign="center" display="flex" justifyContent="center" alignItems="center" color={(theme) => theme.palette.primary.main}>
                        <AccountCircleOutlinedIcon sx={{ fontSize: 70 }} />
                    </Box>

                    <Toolbar />
                    <Grid gap={1} container>

                        <Grid xs={12} item>

                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label='Name'
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: <PortraitIcon />
                                }}
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={last}
                                onChange={(e) => setLast(e.target.value)}
                                label='Last Name' aria-describedby="basic-addon2"
                                type='Last Name'
                                fullWidth
                                InputProps={{
                                    endAdornment: <PortraitIcon />
                                }}
                                required
                            />
                        </Grid>



                        <Grid xs={12} item>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                value={dateOfBirth}
                                onChange={handleDateOfBirthChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <CakeIcon />
                                }}
                                required
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <FormControl fullWidth>
                                <InputLabel id='gender-label'>Gender</InputLabel>
                                <Select
                                    labelId='gender-label'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <MenuItem value='female'>Female</MenuItem>
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='other'>Other</MenuItem>
                                    <MenuItem value='other'>Prefer Not to Say</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} item>
                            <label>Skills: <i>(please rate your knowledge)</i></label>
                            {skills.map((skill, index) => (
                                <div key={index}>
                                    <TextField
                                        value={skill.name}
                                        onChange={(event) => handleSkillNameChange(event, index)}
                                        label={`Skill ${index + 1}`}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <FormatPaintIcon />
                                        }}
                                    />
                                    <Box sx={{ width: 520 }}>
                                        <Slider
                                            defaultValue={50}
                                            value={skill.level}
                                            onChange={(event, newValue) => handleSkillLevelChange(event, newValue, index)}
                                            getAriaValueText={valuetext}
                                            valueLabelDisplay="auto"
                                            step={10}
                                            marks
                                            min={0}
                                            max={100}
                                        />
                                    </Box>
                                    {index > 0 && <button type="button" onClick={() => handleRemoveSkill(index)}>Remove Skill</button>}
                                </div>
                            ))}
                            <button type="button" onClick={handleAddSkill}>Add Skill</button>
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                label='About You'
                                type='text'
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{
                                    endAdornment: <InfoIcon />
                                }}
                            />
                        </Grid>

                        <Grid xs={12} item>
                        
                            <Typography variant='3' component='h4'  >
                                Social Media Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                label='Facebook'
                                fullWidth
                            />
                            {facebook && (
                                <p>
                                    Profile link:{' '}
                                    <a href={generateProfileLink(facebook, 'facebook')} target='_blank' rel='noopener noreferrer'>
                                        {generateProfileLink(facebook, 'facebook')}
                                    </a>
                                </p>
                            )}
                        </Grid>



                        <Grid item xs={12}>
                            <TextField
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                label='Instagram'
                                fullWidth
                            />
                            {instagram && (
                                <p>
                                    Profile link:{' '}
                                    <a href={generateProfileLink(instagram, 'instagram')} target='_blank' rel='noopener noreferrer'>
                                        {generateProfileLink(instagram, 'instagram')}
                                    </a>
                                </p>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                label='Snapchat'
                                fullWidth
                            />
                            {twitter && (
                                <p>
                                    Profile link:{' '}
                                    <a href={generateProfileLink(twitter, 'twitter')} target='_blank' rel='noopener noreferrer'>
                                        {generateProfileLink(twitter, 'twitter')}
                                    </a>
                                </p>
                            )}
                        </Grid>

                        <Grid display='flex' justifyContent='center' xs={12} item>
                            <Button type='submit' variant='contained' disabled={name}>
                                Save
                            </Button>
                        </Grid>
                        <Grid>

                        </Grid>
                    </Grid>
                </Box>

            </Grid>
        </Grid>
    );
}

export default ProfileCreation;
