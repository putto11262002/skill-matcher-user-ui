
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
      <Head>
        <title>Skill matcher</title>
      </Head>
    </>
  );
}
