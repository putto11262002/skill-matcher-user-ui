import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useAuth from '@/hooks/useAuth';
import Loader from '@/components/common/Loader';

const inter = Inter({ subsets: ['latin'] });

export default function Home({}) {
   useAuth()
   const router = useRouter()

   useEffect(() => {
    router.push('/user')
   }, [])

  
  return (
    <>
      
    </>
  );
}