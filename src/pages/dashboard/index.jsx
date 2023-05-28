import React from 'react';
import { Grid, Container, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';
import TextField from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@mui/icons-material/StarRate';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import userService from "@/services/user.service";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import SearchInput from "@/components/common/form/SearchInput";
import { MATCH_PAGE_SIZE, MATCH_STATUS } from "@/constants/match.constant";
import MatchDashboard from "@/components/match/MatchDashboard";
import matchService from "@/services/match.service";
import UserSkillTabs from "@/components/user/skill/UserSkillTabs";
import Skill from "@/components/user/skill/Skill";
// import reportService from "../../../../services/report.service";
import reviewService from '@/services/review.service';
// import { REPORT_CATEGORY } from "../../../../constants/report.constant";
import ReviewCard from "@/components/user/ReviewCard";
import ReportDialog from "@/components/report/ReportDialog";


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
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState({});
    const [users, setUsers] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [updatedSearchTerm, setUpdateSearchTerm] = useState(true);
    const { id } = router.query;
    const { user: authUser } = useSelector((state) => state.auth);
    const [skills, setSkills] = useState([]);
    const [reportDialogOpen, setReportDialogOpen] = useState(undefined);


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

    const {
        data: reviewRes,
        refetch: fetchReviews,
        isLoading: isLoadingReview,
        error: loadingReviewError,
    } = useQuery(
        ["user", id, "reviews"],
        () => reviewService.getReviewByUser({ userId: authUser?._id, withSource: true }),
        {
            enabled: false,
        }
    );

    const {
        isLoading: isLoadingSkills,
        error: errorLoadingSkills,
        refetch: fetchSkills,
    } = useQuery(
        ["user", authUser?._id, "skills"],
        () => userService.getUserSkills({ userId: authUser._id, query: {} }),
        { onSuccess: (res) => setSkills(res.data?.data), enabled: false }
    );

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


    const {
        isLoading: isLoadingUsers,
        error,
        data: requestingUsersRes
    } = useQuery(
        ["feed", "matched", page, query],
        () =>
            userService.getRequestedUsers({
                ...query,
                pageSize: MATCH_PAGE_SIZE,
                q: searchTerm,
                match: MATCH_STATUS.PENDING,
                pageNumber: page,
            }),
        {

        }
    );

    const handleMatch = (user) => {
        matchUser({ userId: user._id });
    };


    const { mutate: declineRequest } = useMutation(matchService.declineRequest, {
        onSuccess: (res, { userId }) => {
            enqueueSnackbar("Match request has been declined", { variant: "success" })
            setUsers(prevUsers => prevUsers.filter(u => u._id !== userId))
        },
        onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
    });

    const { mutate: acceptRequest } = useMutation(matchService.acceptMatchRequest, {
        onSuccess: (res, { userId }) => {
            enqueueSnackbar("Match request has been accepted", { variant: "success" })
            setUsers(prevUsers => prevUsers.filter(u => u._id !== userId))
        },
        onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
    });

    const handleOpenReportDialog = (target) => {
        setReportDialogOpen(target);
    };

    const handleDecline = (user) => {
        declineRequest({ userId: user._id });
        // setFeed(prevFeed => prevFeed.filter(u => u._id !== user._id))
    }

    const handleAccept = (user) => {
        console.log(user)
        acceptRequest({ userId: user._id });

    }
    useEffect(() => {
        if (authUser?._id) {
            fetchSkills();
            fetchReviews()
        }
    }, [authUser?._id]);

    console.log(reviewRes)


    return (
        <Container style={{ backgroundColor: '#e1f5fe' }} maxWidth="lg">
            <Grid container spacing={4}>
                {/* <Grid item xs={12}>
                    <Typography variant="h1" align="center">
                        Dashboard
                    </Typography>
                </Grid> */}
                <Grid item xs={12} md={20}>
                    <Container className="container">
                        <Box textAlign="center" display="flex" justifyContent="center" alignItems="center">
                            {/* <AccountCircleIcon sx={{ fontSize: 70 }} /> */}
                            <Avatar className={classes.avatar} src={user?.avatar?.url} />
                        </Box>
                        <Box className={classes.center}>
                            <Typography align='center' variant="h2">
                                {firstName} {lastName}
                            </Typography>
                        </Box>
                        {/* <Box className={classes.center}>
                            <Typography align='center' variant="body1">
                                Software Engineer
                            </Typography>
                        </Box> */}

                        <Box marginTop={2} /> {/* Adds vertical space */}
                        <Typography variant="body1">

                        </Typography>


                        <Box marginTop={5} display="flex" justifyContent="center">
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h3" className={classes.center}>
                                    10
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

                {/* <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography> Match History </Typography>
      <Stack spacing={3} maxWidth={600} sx={{ width: "100%" }}>
        <Box
          onSubmit={(e) => {
            e.preventDefault();
            setPage(0);
            setUpdateSearchTerm(true);
            refetch();
          }}
          component="form"
        >
        </Box>
        <MatchGridRequest
          hasMore={hasMore}
          onNext={() => setPage((prevPage) => prevPage + 1)}
          users={users}
          loading={isLoadingUsers}
          error={error}
        />
      </Stack>
    </Box> */}


                <Grid item xs={12} md={4}>
                <Stack  sx={{padding: 3, background: theme => theme.palette.background.default}} spacing={3}>
                        <Typography variant="h3" className={classes.sectionTitle} style={{ textAlign: 'center' }}>
                            Requests
                        </Typography>
                       
                            {requestingUsersRes?.data?.data?.map(user => <MatchDashboard
                                hasMore={hasMore}
                                onNext={() => setPage((prevPage) => prevPage + 1)}
                                user={user}
                                onDecline={handleDecline}
                                onAccept={handleAccept}
                                loading={isLoadingUsers}
                                error={error}
                            />)
                            }
                            <Box marginTop={2} /> {/* Adds vertical space */}
                            <Link href="/profile-creation" underline="none">
                                <Button variant="outlined">See All</Button>
                            </Link>
                        
                   </Stack>
                </Grid>

                {/* <Stack spacing={2}>
          <Typography display="flex" alignItems="flex-start">
            {user?.profile?.firstName} {user?.profile?.lastName}&apos;s Reviews
          </Typography>
          <ReviewCard
            user={user} // Pass the user object as a prop to ReviewCard component
            
          />
        </Stack>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          columnGap: 2,
        }}>
        </Box> */}

                <ReportDialog
                    target={reportDialogOpen}
                    open={Boolean(reportDialogOpen)}
                />

                <Grid item xs={12} md={4}>
                    <Stack  sx={{padding: 3, background: theme => theme.palette.background.default}} spacing={3}>
                        <Typography variant="h3" className={classes.sectionTitle} style={{ textAlign: 'center' }}>
                            Reviews
                        </Typography>
                       
                            {(!isLoadingReview && !loadingReviewError && reviewRes?.data?.data?.length > 0) && <Stack spacing={2}>
                                {!isLoadingReview &&
                                    reviewRes?.data?.data?.slice(0, 3)?.map((review) => (
                                        <ReviewCard review={review} />
                                    ))}
                            </Stack>}

                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                columnGap: 2,
                            }}>
                            </Box>
                            </Stack>
                  
                </Grid>

                <Grid item xs={12} md={4}>
                    <Container className="container">
                        <Skill
                            skills={skills}
                            isLoadingSkills={isLoadingSkills}
                        />
                        <Box marginBottom={2} /> {/* Adds vertical space */}
                        <Link href="/match/edit-profile" underline="none">
                            <Button variant="outlined">Edit</Button>
                        </Link>
                    </Container>
                </Grid>


                <Grid item xs={12}>
                    <Typography variant="body2" align="center">
                        &copy; 2023 John Doe
                    </Typography>
                </Grid>
            </Grid>
        </Container >
    );
}

export default Dashboard;
