
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { 
  Typography,
  Link,
  Button, 
} from '@mui/material';


const inter = Inter({ subsets: ['latin'] })

const Home = ()  => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) router.push('/login');
  }, []);

  return (
    <>
      <Head>
        <title>Skill matcher</title>
      </Head>

      {/* Use Button instead of Link for conditional rendering */}

      <nav>
        {isLoggedIn ? (
          <Button>Dashboard</Button>
        ) : (
          <>
           <Button>Log in</Button>
           <Button>Sign up</Button>
          </>
        )}
      </nav>



      <Typography variant='1' component='h1'>H1</Typography>
      <Typography >H1</Typography>
      <Typography sx={{display: {xs: 'none', md: 'block'}}} variant='6' component='h6'>H6</Typography>
    </>
  );
}

// Use dynamic export for page what does not require server side rendering (when using const)

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})
