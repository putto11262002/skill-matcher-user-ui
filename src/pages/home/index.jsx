import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Button,
  Link,
  Grid,
  Stack,
  Slide,
  Fade,
} from "@mui/material";
import useAuth from "@/hooks/useAuth";
import ConstructionIcon from "@mui/icons-material/Construction";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ForumIcon from "@mui/icons-material/Forum";
import { useTheme } from "@material-ui/core";
import { amber, blue } from "@mui/material/colors";

const instructionCardData = [
  {
    title: "Skills",
    description:
      "Add skills to your profile showcase your unique expertise and stand out from the crowd!",
    link: "/user/edit-profile",
    icon: (props) => <ConstructionIcon {...props}/>
  },
  {
    title: "Search",
    description:
      "Find like-minded individuals to share and expand your knowledge with!",
    link: "/user/search",
    icon: (props) => <PeopleAltIcon {...props}/>
  },
  {
    title: "Match",
    description:
      " Match with with like-minded individuals who are eager to learn and grow!",
    link: "/user/suggestion",
    icon: (props) => <AddCircleOutlineIcon {...props}/>
  },
  {
    title: "Communicate",
    description:
      "Connect with your passionate and knowledgeable matches and share your expertise!",
    link: "/match",
    icon: (props) => <ForumIcon {...props}/>
  },
];

const HomePage = () => {
  useAuth();

  return (
    <>
      <Stack
        spacing={4}
        sx={{
          padding: 4,
          backgroundColor: "#e1f5fe",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            // Adjust font size for extra small (XS) screens and up
            fontSize: {
              xs: "40px",
              sm: "60px",
              md: "80px",
            },
          }}
        >
          Welcome to Skills Matcher
        </Typography>

        <Typography
          variant="h4"
          component="h4"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            // Adjust font size for extra small (XS) screens and up
            fontSize: {
              xs: "16px",
              sm: "20px",
              md: "24px",
            },
          }}
        >
          Discover new skills and connect with like-minded individuals on our
          cutting-edge app. Whether you&apos;re looking to learn a new skill or
          share your expertise with others, our platform provides the perfect
          one-stop solution. Join our community today and start unlocking your
          full potential!
        </Typography>

        <Box
          sx={{
            alignItems: "stretch",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {instructionCardData.map((card) => (
            <InstructionCard
            icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </Box>
      </Stack>
    </>
  );
};

const InstructionCard = ({ title, description, link, icon }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        padding: 2,
        background: (theme) => theme.palette.background.paper,
        borderRadius: 2,
        flex: { xs: "1 1 0px", lg: "1 1 0px" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
      }}
    >
      <Box className="iconContainer">
        {icon({sx: { fontSize: theme.spacing(18), color: amber[400] }})}
      </Box>
      <Typography variant="h5" align="center">
        {title}
      </Typography>

      <Typography
        sx={{ flexGrow: 1 }}
        variant="subtitle1"
        align="center"
        style={{ fontStyle: "italic" }}
      >
        {description}
      </Typography>

      <Link href={link} underline="none">
        <Button variant="outlined">Add Skills </Button>
      </Link>
    </Box>
  );
};

export default HomePage;
