import React from 'react';
import { Grid, Container, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import './Homepage.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
    },
    section: {
        marginBottom: '2rem',
    },
    sectionTitle: {
        marginBottom: '1rem',
        fontWeight: 'bold',
    },
    centerIcon: {
        display: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: '3rem',
    },
    center: {
        textAlign: 'center',
        margin: 'auto',
    },
    projectLink: {
        color: '#222',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h1" align="center">
                        Dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12} md={20}>
                    <Container className={classes.container}>
                        <Box textAlign="center" display="flex" justifyContent="center" alignItems="center">
                            <AccountCircleIcon sx={{ fontSize: 70 }} />
                        </Box>
                        <Box className={classes.center}>
                            <Typography variant="h3" className={classes.sectionTitle}>
                                Username
                            </Typography>
                        </Box>
                        <Box className={classes.center}>
                            <Typography variant="body1">
                                Software Engineer
                            </Typography>
                        </Box>

                        <Box marginTop={2} /> {/* Adds vertical space */}
                        <Typography variant="body1">
                            Hi, my name is John Doe and I'm a web developer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada suscipit massa vel elementum. Sed eget lorem sapien. Nulla facilisi. Duis vulputate consequat eros vel blandit. Fusce porttitor, quam non luctus varius, mi lacus vehicula arcu, eu commodo elit nulla at velit.
                        </Typography>

                        <Box marginTop={2} display="flex" justifyContent="space-between">
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h3" className={classes.center}>
                                    1000
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.center}>
                                    Followers
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h3" className={classes.center}>
                                    500
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.center}>
                                    Followers
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h3" className={classes.center}>
                                    100
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.center}>
                                    Followers
                                </Typography>
                            </Box>
                        </Box>



                    </Container>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Container className={classes.container}>
                        <Typography variant="h3" className={classes.sectionTitle}>
                            Matches
                        </Typography>
                        <ul>
                            <li>
                                <Box marginTop={2} /> {/* Adds vertical space */}
                                <Avatar alt="Person 1" src="images/avatar1.jpg" className={classes.avatar} />
                                <Typography variant="subtitle1" className={classes.personName}>
                                    Person 1
                                </Typography>
                            </li>
                            <li>
                                <Box marginTop={2} /> {/* Adds vertical space */}
                                <Avatar alt="Person 2" src="images/avatar2.jpg" className={classes.avatar} />
                                <Typography variant="subtitle1" className={classes.personName}>
                                    Person 2
                                </Typography>
                            </li>
                            <li>
                                <Box marginTop={2} /> {/* Adds vertical space */}
                                <Avatar alt="Person 3" src="/path/to/avatar3.jpg" className={classes.avatar} />
                                <Typography variant="subtitle1" className={classes.personName}>
                                    Person 3
                                </Typography>
                            </li>
                            <li>
                                <Box marginTop={2} /> {/* Adds vertical space */}
                                <Avatar alt="Person 3" src="/path/to/avatar3.jpg" className={classes.avatar} />
                                <Typography variant="subtitle1" className={classes.personName}>
                                    Person 4
                                </Typography>
                                <Box marginTop={5} /> {/* Adds vertical space */}
                                <Link
                                    href="/Matches"
                                    sx={{
                                        color: (theme) => theme.palette.text.secondary,
                                        textDecorationColor: (theme) => theme.palette.text.secondary,
                                    }}
                                >
                                    {"See All"}
                                </Link>
                            </li>
                        </ul>
                    </Container>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Container className={classes.container}>
                        <Typography variant="h3" className={classes.sectionTitle}>
                            Tutor
                        </Typography>
                        <ul>
                            <li>
                                <Link href="#" className={classes.projectLink}>
                                    Project 1
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className={classes.projectLink}>
                                    Project 2
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className={classes.projectLink}>
                                    Project 3
                                </Link>
                            </li>
                        </ul>
                    </Container>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Container className={classes.container}>
                        <Typography variant="h3" className={classes.sectionTitle}>
                            Notifications
                        </Typography>
                        <ul>
                            <li>New message received</li>
                            <li>New project assigned</li>
                            <li>Upcoming deadline</li>
                        </ul>
                    </Container>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body2" align="center">
                        &copy; 2023 John Doe
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
