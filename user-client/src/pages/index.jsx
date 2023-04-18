import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head'
import { 
  Typography,
  Link, 
} from '@mui/material';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

      <nav>
        {isLoggedIn ? (
          <Link href="/user-homepage">Dashboard</Link>
        ) : (
          <>
            <Link href="/login">Log in</Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        )}
      </nav>

      <Typography variant='1' component='h1'>H1</Typography>
      <Typography >H1</Typography>
      <Typography sx={{display: {xs: 'none', md: 'block'}}} variant='6' component='h6'>H6</Typography>
    </>
  );
}
