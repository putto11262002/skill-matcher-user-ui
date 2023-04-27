import useAuth from '@/hooks/useAuth'
import React from 'react'

const SearchUsers = () => {
  useAuth()
  return (
    <div>SearchUsers</div>
  )
}

export default SearchUsers