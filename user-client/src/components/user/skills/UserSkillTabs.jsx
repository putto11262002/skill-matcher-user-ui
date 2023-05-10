import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import Loader from "@/components/common/Loader";
import UserSkill from "@/components/user/skills/UserSkill";
import Error from "@/components/common/Error";
import CloseIcon from "@mui/icons-material/Close";
import { upperFirst } from "lodash";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const UserSkillDialog = ({ open, onClose, userSkill }) => {
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle
        component="div"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {upperFirst(userSkill?.skill)}{" "}
        <IconButton onClick={onClose} sx={{}}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <UserSkill
            label={
              <Typography variant="4" component="h4">
                Proficiency
              </Typography>
            }
            value={userSkill}
          />
          <Stack spacing={0.5}>
            <Typography variant="4" component="h4">
              About
            </Typography>
            {!userSkill?.about && <Typography>{userSkill?.about}</Typography>}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const UserSkillTabs = ({
  tutorSkills,
  isLoadingTutorSkills,
  errorTutorSkills,
  learningSkills,
  isLoadingLearningSkills,
  errorLearningSkills,
}) => {
  const [value, setValue] = React.useState(0);
  const [selectedSkill, setSelectedSkill] = useState(undefined);

  const handleOpenModal = (userSkill) => {
    setSelectedSkill(userSkill);
  };

  const handleCloseModal = () => {
    setSelectedSkill(undefined);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", minWidth: "15em" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          centered
          aria-label="basic tabs example"
          component="div"
        >
          <Tooltip title="Skills they are learning">
            <Tab disableTouchRipple label="Learner" {...a11yProps(0)} />
          </Tooltip>
          <Tooltip title="Skills they are tutoring">
            <Tab disableTouchRipple label="Tutor" {...a11yProps(1)} />
          </Tooltip>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack spacing={3}>
          {isLoadingLearningSkills ? (
            <Typography>sdfsd</Typography>
          ) : errorLearningSkills ? (
            <Typography>SDfs</Typography>
          ) : (
            learningSkills?.map((skill) => (
              <UserSkill
                key={skill.skill}
                onClick={handleOpenModal}
                value={skill}
              />
            ))
          )}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack spacing={3}>
          {isLoadingTutorSkills ? (
            <Loader />
          ) : errorTutorSkills ? (
            <Error />
          ) : (
            tutorSkills?.map((skill) => (
              <UserSkill
                onClick={handleOpenModal}
                key={skill.skill}
                value={skill}
              />
            ))
          )}
        </Stack>
      </TabPanel>

      <UserSkillDialog
        onClose={handleCloseModal}
        userSkill={selectedSkill}
        open={Boolean(selectedSkill)}
      />
    </Box>
  );
};

export default UserSkillTabs;
