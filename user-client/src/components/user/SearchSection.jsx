import {
  Box,
  Paper,
  Stack,
  InputBase,
  IconButton,
  Typography,
  Button,
  FormControlLabel,
  Grid,
  Checkbox,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { CheckBox } from "@mui/icons-material";
import SearchInput from "../common/form/SearchInput";


const RoleFilterSection = ({ onChange }) => {
  const [selectedRole, setSelectedRole] = useState(undefined);
  useEffect(() => {
    onChange(selectedRole);
  }, [selectedRole]);
  return (
   
      <Stack rowGap={1}>
        <Typography
          variant="subtitle1"
          //   fontWeight={(theme) => theme.typography.fontWeightBold}
          color={(theme) => theme.palette.text.secondary}
        >
          Filter by
        </Typography>
        <Stack direction="row" rowGap={3}>
          <FormControlLabel
            control={<Checkbox name="learner" />}
            label="Learn"
            checked={selectedRole === "learner"}
            onChange={(e) => {
              if (selectedRole === "learner") return setSelectedRole(undefined);
              setSelectedRole("learner");
            }}
          />

          <FormControlLabel
            control={<Checkbox name="tutor" />}
            label="Teach"
            checked={selectedRole === "tutor"}
            onChange={(e) => {
              if (selectedRole === "tutor") return setSelectedRole(undefined);
              setSelectedRole("tutor");
            }}
          />
        </Stack>
      </Stack>
   
  );
};

const SkillFilterSection = ({ skills, onChange }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  useEffect(() => {
    onChange(selectedSkills);
  }, [selectedSkills]);
  return (
    
      <Stack rowGap={1}>
        <Typography
          variant="subtitle1"
          //   fontWeight={(theme) => theme.typography.fontWeightBold}
          color={(theme) => theme.palette.text.secondary}
        >
          Skills
        </Typography>
        <Stack gap={3} sx={{flexWrap: 'wrap'}} direction="row">
          {skills?.length > 1 &&
            skills?.map((skill) => (
              <FormControlLabel
                key={skill.skill}
                control={<Checkbox name={skill.skill} />}
                label={skill.skill}
                onChange={(event) => {
                  if (event.target.checked) {
                    setSelectedSkills([...selectedSkills, event.target.name]);
                  } else {
                    setSelectedSkills(
                      selectedSkills.filter(
                        (skill) => skill !== event.target.name
                      )
                    );
                  }
                }}
              />
            ))}
        </Stack>
      </Stack>
   
  );
};

const SearchSection = ({ skills, onSubmit, loading}) => {
  const [query, setQuery] = useState({ matched: false });
  const handleSearchTermChange = (q) => {
    setQuery({ ...query, q });
  };

  const handleSkillChange = (skills) => {
    setQuery({ ...query, skills: skills?.length > 0 ?  skills?.join(',') : undefined});
  };

  const handleRoleChange = (role) => {
    setQuery({ ...query, skillRole: role });
  };

  return (
    <Box
      onSubmit={(e) => {
        e.preventDefault();
        if(loading) return 
        onSubmit(query)
      }}
      component="form"
    >
      <Stack spacing={3}>
        <SearchInput onChange={handleSearchTermChange} />
        <Paper sx={{paddingX: 3, paddingY: 2}}>
        <RoleFilterSection onChange={handleRoleChange} />
        <SkillFilterSection skills={skills} onChange={handleSkillChange} />
        </Paper>
      </Stack>
    </Box>
  );
};

export default SearchSection;
