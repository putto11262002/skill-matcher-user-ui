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
} from '@mui/material';
import React, { useState } from 'react';
import { upperFirst } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import userService from '@/services/user.service';
import { USER_PAGE_SIZE } from '@/constants/user.contant';
import Link from 'next/link';
const COLUMNS = ['username', 'email', 'status', 'role'];
// TODO add search and filter, add actions - delete update view buttons/popup
const UserTable = ({ users, pageNumber, loading, error , onPageChange, total}) => {



  const renderUserRows = () => {
    if (loading) {
      return;
    }

    return users.map((user) => (
    
      <TableRow onClick={console.log} sx={{cursor: 'pointer'}} hover tabIndex={-1} key={user._id}>
     
       {COLUMNS.map((column) => (
          <TableCell key={user._id + column}>{user[column]}</TableCell>
        ))}
      
      </TableRow>
   
    ));
  };
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
            <TablePagination rowsPerPageOptions={[]} rowsPerPage={USER_PAGE_SIZE} count={total} onPageChange={onPageChange} page={pageNumber} />
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
