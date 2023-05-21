import UserTable from '@/components/user/UserTable';
import { USER_PAGE_SIZE, USER_ROLE } from '@/constants/user.contant';
import useAuth from '@/hooks/useAuth';
import userService from '@/services/user.service';
import { Box, Grid, InputBase, MenuItem, Stack, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { omit, upperFirst } from 'lodash';
import { useEffect, useState } from 'react';

const UserPage = () => {
  useAuth();

  const [page, setPage] = useState(0);
  const [query, setQuery] = useState({})

  const { data, isError, isLoading, refetch } = useQuery(['users', page, query], () =>
    userService.searchUsers({ pageNumber: page, pageSize: USER_PAGE_SIZE, q: query.q, roles: query?.roles ?  query?.roles?.join(',') : undefined }),
    {enabled: false}
  );

  useEffect(() => {
    refetch()
  }, [query])
  return (
    <>
      <Stack spacing={3}>
        <Box>
          <Grid gap={2} container>
            <Grid xs={12} md={4} item>
              <TextField onChange={(e) => setQuery(prevQuery => ({...prevQuery, q: e.target.value}))} fullWidth placeholder='Search name, username...' />
            </Grid>
            <Grid xs={12} md={4} item>
              <TextField disabled={isLoading} value={query.roles ? query.roles[0] : 'all'} onChange={(e) =>  setQuery(prevQuery => ({...prevQuery, roles: e.target.value !=='all' ?  [e.target.value] : undefined}))} label='Role' fullWidth select>
              <MenuItem disabled={isLoading} value='all'>All</MenuItem>
                {Object.values(omit(USER_ROLE, ['root'])).map((r) => (
                  <MenuItem value={r} key={r}>{upperFirst(r)}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
        <UserTable
          pageNumber={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          total={data?.data?.total || 0}
          loading={isLoading}
          error={isError}
          users={data?.data?.data}
        />
      </Stack>
    </>
  );
};

export default UserPage;
