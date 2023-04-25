
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
    if (isLoggedIn) router.push('/home');
    else router.push('/landing')
    
  }, []);

  return (
    <>
      <Head>
        <title>Skill matcher</title>
      </Head>

     
    </>
  );
}

// Use dynamic export for page what does not require server side rendering (when using const)

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})
