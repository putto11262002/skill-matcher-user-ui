
import { Inter } from 'next/font/google'
import {  useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';


const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const router = useRouter()
  const {isLoggedIn}  = useSelector(state => state.auth)

  useEffect(() => {
    if(isLoggedIn)  {
      router.push('/home') 
      return
  }
    router.push('landing')
    
  }, [])

  return (
    <>
      
    </>
  );
}

// Use dynamic export for page what does not require server side rendering (when using const)

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})
