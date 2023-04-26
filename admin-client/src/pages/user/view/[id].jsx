import useAuth from '@/hooks/useAuth';
import React from 'react';

const ViewUserPage = () => {
  useAuth()
  return <div>ViewUserPage</div>;
};

export default ViewUserPage;
