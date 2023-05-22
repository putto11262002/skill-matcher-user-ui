import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Loader from '../common/Loader';
import { upperFirst } from 'lodash';
import { REPORT_PER_PAGE, REPORT_TABLE } from '../../constants/report.constant';
const ReportTable = ({ reports, pageNumber, loading, error, onPageChange, total, onSelect }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  const renderRows = () => {
    return reports?.map((report) => (
      <TableRow hover tabIndex={-1} key={report._id}>
        {REPORT_TABLE.map(({ index, align, transform }) => {
          return (
            <TableCell align={align || 'left'} key={report._id + index}>
              {transform ? transform(report[index]) : report[index]}
            </TableCell>
          );
        })}
        <TableCell align='right'>
          <Box>
            <IconButton
              onClick={() => onSelect(report)}
              sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {REPORT_TABLE.map(({ index }) => (
              <TableCell
                sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
                key={index}
                align='left'
              >
                {upperFirst(index)}
              </TableCell>
            ))}
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRows()}
          <TableRow>
            <TablePagination
              rowsPerPage={REPORT_PER_PAGE}
              rowsPerPageOptions={[]}
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

export default ReportTable;
