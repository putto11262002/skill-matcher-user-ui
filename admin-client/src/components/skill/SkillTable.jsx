import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { SKILL_PAGE_SIZE, SKILL_TABLE_COLUMNS } from '../../constants/skill.contant';
import { truncate, upperFirst } from 'lodash';
import Loader from '../common/Loader';
import Error from '../common/Error';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';

const SkillTable = ({ skills, loading, error, total, onPageChange, pageNumber }) => {
  const renderSkillRows = () => {
    return skills.map((skill) => (
      <TableRow hover key={skill.name}>
        {SKILL_TABLE_COLUMNS.map((column) => {
          if (column !== 'actions') {
            return <TableCell sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} key={skill.name + column}>{truncate(skill[column], {length: 50})}</TableCell>;
          }
          return (
            <TableCell align='right' key={skill.name + column}>
              <Stack direction='row' spacing={2}><Link href={`/skill/edit/${skill.name}`}><EditIcon fontSize='s'/></Link></Stack>
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <Error/>
  }
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {SKILL_TABLE_COLUMNS.map((column) => (
            <TableCell key={column} sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}>
              {upperFirst(column)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {renderSkillRows()}
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[]}
            rowsPerPage={SKILL_PAGE_SIZE}
            count={total}
            onPageChange={onPageChange}
            page={pageNumber}
          />
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SkillTable;
