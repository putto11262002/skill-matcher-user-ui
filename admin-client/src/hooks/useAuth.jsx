import Router  from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuth = () => {
  
    const {isLoggedIn} = useSelector(state => state.auth)
    
   if(!isLoggedIn && process.browser){
    Router.push('/sign-in')
   }
   
  return null
}
export default useAuth