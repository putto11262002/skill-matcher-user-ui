import React, { useState } from 'react';
//import './App.css';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    Alert,
    Box,
    Grid,
    TextField,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';

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
    const [name, setName] = useState('');
    const [last, setLast] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState([{ name: '', level: 50 }]);
    const [about, setAbout] = useState('');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [photo, setPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
      };

      
    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLastChange(event) {
        setLast(event.target.value);
    }

    function handleUsernameChange(event) {
        setName(event.target.value);
    }

    function handleAgeChange(event) {
        setAge(event.target.value);
    }

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

    return (
        <Grid container justifyContent='center' alignItems='center' height='100%'>
        <Grid xs={11} sm={6} item>
                <Box
                    padding={(theme) => theme.spacing(3)}
                    sx={{ boxShadow: { sm: 2, xs: 0 }, borderRadius: 2 }}
                >
                    <Typography variant='2' textAlign='center' component='h2'>
                        Profile Creation
                    </Typography>
                    
                    <Toolbar />
                    <Grid gap={1}  container>
                    <AccountCircleIcon sx={{ fontSize: 70 }} />
                        <Grid xs={12} item>
                        </Grid>
                       
                        <Grid xs={12} item>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label='Name'
                                fullWidth
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={last}
                                onChange={(e) => setLast(e.target.value)}
                                label='Last Name'
                                type='Last Name'
                                fullWidth
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                label='Username'
                                type='text'
                                fullWidth
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                value={age} onChange={handleAgeChange}
                                label='Age'
                                type='number'
                                inputProps={{ min: '16' }}// add min attribute
                                fullWidth
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <FormControl fullWidth>
                                <InputLabel id='gender-label'>Gender</InputLabel>
                                <Select
                                    labelId='gender-label'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value='female'>Female</MenuItem>
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='other'>Other</MenuItem>
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
                                    />
                                    <Box sx={{ width: 570 }}>
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
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <Typography variant='3' component='h4'>
                                Social Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                label='Facebook'
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                label='Instagram'
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                label='Snapchat'
                                fullWidth
                            />
                        </Grid>


                        <Grid display='flex' justifyContent='center' xs={12} item>
                            <Button type='submit' variant='contained' disabled={name}>
                                Save
                            </Button>
                        </Grid>
                        <Grid>
                            <Button variant=""></Button>
                        </Grid>
                    </Grid>
                </Box>

            </Grid>
            </Grid>
    );
};

export default ProfileCreation;
