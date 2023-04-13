
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) router.push('/sign-in');
  }, []);
  return (
    <>
<<<<<<< HEAD
    <Head>
      <title>Skill matcher</title>
    </Head>
    <div>
      thexvxvcvxcvt</div> 
=======
      <Head>
        <title>Skill matcher</title>
      </Head>
>>>>>>> f23884273ad504b02da5f24b392bcb4d0803e26e
    </>
  );
}
