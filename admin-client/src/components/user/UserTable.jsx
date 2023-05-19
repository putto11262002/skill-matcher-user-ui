import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
  TablePagination,
  Typography,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { upperFirst } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import userService from '@/services/user.service';
import { USER_PAGE_SIZE } from '@/constants/user.contant';
import Link from 'next/link';
const COLUMNS = ['username', 'email', 'status', 'role', 'actions'];
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loader from '../common/Loader';
import Error from '../common/Error';
import DeleteIcon from '@mui/icons-material/Delete';
// TODO add search and filter, add actions - delete update view buttons/popup
const UserTable = ({ users, pageNumber, loading, error, onPageChange, total }) => {
  const renderUserRows = () => {
    return users.map((user) => (
      <TableRow hover tabIndex={-1} key={user._id}>
        {COLUMNS.map((column) => {
          if (column !== 'actions') {
            return <TableCell key={user._id + column}>{user[column]}</TableCell>;
          }
          return (
            <TableCell align='center' key={user._id + column}>
              <Stack direction='row' spacing={2}>
                <Link href={`/user/edit/${user._id}`}>
                 <IconButton>
                 <EditIcon fontSize='s' />
                 </IconButton>
                </Link>
                {/* <IconButton onClick={() => onDeleteUser(user)}>
                  <DeleteIcon/>
                </IconButton> */}
              </Stack>
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }
  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell
                sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
                key={column}
                align='left'
              >
                {upperFirst(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderUserRows()}
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              rowsPerPage={USER_PAGE_SIZE}
              count={total}
              onPageChange={onPageChange}
              page={pageNumber}
            />
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
