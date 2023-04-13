import UserTable from '@/components/user/UserTable';
import { USER_PAGE_SIZE } from '@/constants/user.contant';
import userService from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import {useState} from 'react';

const UserPage = () => {
  


  const [page, setPage] = useState(0);

  const {data, isError, isLoading} = useQuery(['users', page], () => userService.searchUsers({pageNumber: page, pageSize: USER_PAGE_SIZE}))

  return (
    <>
      <UserTable pageNumber={page} onPageChange={(e, newPage) => setPage(newPage)} total={data?.data?.total || 0} loading={isLoading} error={isError} users={data?.data?.data} />
    </>
  );
};

export default UserPage;
