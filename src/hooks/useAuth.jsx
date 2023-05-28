import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useAuth = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
    const router = useRouter()
    useEffect(() => {
        if(!isLoggedIn) router.push('/landing')
    }, [isLoggedIn])
  return null
}
export default useAuth