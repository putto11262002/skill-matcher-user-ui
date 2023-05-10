import React from 'react';
import { Grid, Container, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import './hi.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';
import TextField from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@mui/icons-material/StarRate';
//import './style.js'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import userService from "@/services/user.service";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react';;



const action = (
    <Button color="primary" size="small">
        open
    </Button>
);

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#ffff',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
    },
    body: {
        backgroundColor: '#e1f5fe',
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
    avatar: {
        width: '100px',
        height: '100px'
    },
    projectLink: {
    color: '#222',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
},
}));

const Dashboard = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(undefined)
    const [errors, setErrors] = useState({});
    const { isLoggedIn } = useSelector((state) => state.auth);
    const router = useRouter();


    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            userService.getSelf().then((response) => {
                const user = response.data;
                setUser(user)
                setFirstName(user.profile.firstName);
                setLastName(user.profile.lastName);
                setEmail(user.email);
            }).catch((error) => {
                console.log('Error fetching user data', error);
            });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});
        userService.updateUser({ firstName, lastName, email }).then(() => {
            router.push('/profile');
        }).catch((error) => {
            console.log('Error updating user data', error);
            setErrors(error.response.data);
        });
    };

    // const router = useRouter();
    // // const { id } = router.query;
    // const { user: authUser } = useSelector((state) => state.auth);
    // const [user, setUser] = useState(null);
    // const dispatch = useDispatch()

    // const { refetch: fetchUser } = useQuery(
    //     ["user", authUser?._id],
    //     userService.getSelf,
    //     {
    //         onSuccess: (res) => {
    //             reset(res.data)
    //             setUser(res.data)
    //         }, enabled: false
    //     }
    // );





    return (
        <Container style={{ backgroundColor: '#e1f5fe' }} maxWidth="lg">
            <Grid container spacing={4}>
                {/* <Grid item xs={12}>
                    <Typography variant="h1" align="center">
                        Dashboard
                    </Typography>
                </Grid> */}
                <Grid item xs={12} md={20}>
                    <Container className={classes.container}>
                        <Box textAlign="center" display="flex" justifyContent="center" alignItems="center">
                            {/* <AccountCircleIcon sx={{ fontSize: 70 }} /> */}
                            <Avatar className={classes.avatar} src={user?.avatar?.url} />
                        </Box>
                        <Box className={classes.center}>
                            <Typography align='center' variant="h2">
                                {firstName} {lastName}
                            </Typography>
                        </Box>
                        <Box className={classes.center}>
                            <Typography align='center' variant="body1">
                                Software Engineer
                            </Typography>
                        </Box>

                        <Box marginTop={2} /> {/* Adds vertical space */}
                        <Typography variant="body1">

                        </Typography>

                        <Box marginTop={5} display="flex" justifyContent="center">
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h3" className={classes.center}>
                                    1000
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.center}>
                                    Matches
                                </Typography>
                            </Box>
                            <Box marginTop={5} /> {/* Adds vertical space */}
                            <Box marginRight={15} /> {/* Adds vertical space */}
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h3" className={classes.center}>
                                    <StarRateIcon sx={{ fontSize: 43, marginRight: "0.08rem" }} style={{ fill: "orange" }} />
                                    3.5
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.center}>
                                    Rating
                                </Typography>
                            </Box>
                        </Box>
                        <Box marginTop={2} /> {/* Adds vertical space */}
                        <Link href="/user/edit-profile" underline="none">
                            <Button variant="outlined">Edit Profile </Button>
                        </Link>
                    </Container>
                </Grid>

                <Grid item xs={13} md={4}>
                    <Container className={classes.container}>
                        <Typography variant="h3" className={classes.sectionTitle} style={{ textAlign: 'center' }}>
                            Matches
                        </Typography>
                        <ul>
                            <li>
                                <Box marginTop={4} /> {/* Adds vertical space */}
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center">
                                        <Avatar className={classes.orangeAvatar}>N</Avatar>
                                        <Typography variant="subtitle1" className={classes.personName} style={{ marginLeft: '8px' }}>
                                            Violet
                                        </Typography>
                                    </Box>
                                    <DeleteIcon />
                                </Box>
                            </li>

                            <li>
                                <Box marginTop={3} /> {/* Adds vertical space */}
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center">
                                        <Avatar className={classes.orangeAvatar}>N</Avatar>
                                        <Typography variant="subtitle1" className={classes.personName} style={{ marginLeft: '8px' }}>
                                            George
                                        </Typography>
                                    </Box>
                                    <DeleteIcon />
                                </Box>
                            </li>
                            <li>
                                <Box marginTop={3} /> {/* Adds vertical space */}
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center">
                                        <Avatar className={classes.orangeAvatar}>N</Avatar>
                                        <Typography variant="subtitle1" className={classes.personName} style={{ marginLeft: '8px' }}>
                                            Charlotte
                                        </Typography>
                                    </Box>
                                    <DeleteIcon />
                                </Box>
                            </li>
                            <li>
                                <Box marginTop={3} /> {/* Adds vertical space */}
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center">
                                        <Avatar className={classes.orangeAvatar}>N</Avatar>
                                        <Typography variant="subtitle1" className={classes.personName} style={{ marginLeft: '8px' }}>
                                            Karly
                                        </Typography>
                                    </Box>
                                    <DeleteIcon />
                                </Box>
                                <Box marginBottom={5} /> {/* Adds vertical space */}
                                <Link href="/match" underline="none">
                                    <Button variant="outlined">See All</Button>
                                </Link>
                            </li>
                        </ul>
                    </Container>
                </Grid>


                <Grid item xs={12} md={4}>
                    <Container className={classes.container}>
                        <Typography variant="h3" className={classes.sectionTitle} style={{ textAlign: 'center' }}>
                            Reviews
                        </Typography>
                        <ul>
                            <li>
                                <Box display="flex" alignItems="center">
                                    <Avatar alignItems="left" className={classes.orangeAvatar}>A</Avatar>
                                    <Typography variant="h6" className={classes.personName} style={{ marginLeft: '8px' }}>
                                        Amanda
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <Stack spacing={1}>
                                        <Rating name="homepage" alignItems="center" defaultValue={4.5} precision={0.5} readOnly size="medium" />
                                    </Stack>
                                </Box>
                                <Typography variant="subtitle1" justifyContent="center" style={{ fontStyle: 'italic' }}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                </Typography>
                            </li>
                            <li>
                                <Box marginTop={2} /> {/* Adds vertical space */}
                                <Box display="flex" alignItems="center">
                                    <Avatar className={classes.orangeAvatar}>T</Avatar>
                                    <Typography variant="h6" className={classes.personName} style={{ marginLeft: '8px' }}>
                                        Tim
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <Stack spacing={1}>
                                        <Rating name="homepage" align="center" defaultValue={4} precision={0.5} readOnly size="medium" />
                                    </Stack>
                                </Box>
                                <Typography variant="subtitle1" justifyContent="alignContent" style={{ fontStyle: 'italic' }}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                </Typography>
                                <Box marginBottom={3} /> {/* Adds vertical space */}
                                <Link href="/profile-creation" underline="none">
                                    <Button variant="outlined">See All</Button>
                                </Link>
                            </li>
                        </ul>
                    </Container>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Container className={classes.container}>
                        <Stack spacing={2} sx={{ maxWidth: 600 }}>
                            <Typography variant="h3" className={classes.sectionTitle}>
                                Notifications
                            </Typography>
                            {/* <SnackbarContent sx={{ background: theme => theme.palette.background.paper, color: "black" }} message="I love snacks." action={action} /> */}
                            <SnackbarContent sx={{ background: theme => theme.palette.background.paper, color: "black" }}
                                message={
                                    'Reece wants to match with you'
                                }
                                action={action}
                            />
                            <SnackbarContent sx={{ background: theme => theme.palette.background.paper, color: "black" }}
                                message="Maggie has accepted your request"
                                action={action}
                            />
                            <SnackbarContent sx={{ background: theme => theme.palette.background.paper, color: "black" }}
                                message={
                                    'Nathan has accepted your request'
                                }
                                action={action}
                            />
                        </Stack>
                        <Box marginBottom={2} /> {/* Adds vertical space */}
                        <Link href="/match/requests" underline="none">
                            <Button variant="outlined">See All</Button>
                        </Link>
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

export default Dashboard;
