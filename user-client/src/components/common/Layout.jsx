import { Container } from '@mui/material';
import React from 'react'
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main style={{ padding: '1rem', fontFamily: 'Montserrat, sans-serif', fontSize: '1.2rem' }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;