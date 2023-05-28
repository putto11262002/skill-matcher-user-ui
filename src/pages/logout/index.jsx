import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '@/redux/thunks/user.thunk';
import { useRouter } from 'next/router';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(signOut());
    router.push('/home');
  };

  return (
    <div>
      <h2>Are you sure you want to sign out?</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Logout;
