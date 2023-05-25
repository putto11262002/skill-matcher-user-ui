import { Autocomplete, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReportTable from '../../components/report/ReportTable';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import reportService from '../../services/report.service';
import { REPORT_PER_PAGE } from '../../constants/report.constant';
import ReportDialog from '../../components/report/ReportDialog';
import useAuth from '@/hooks/useAuth';

const ReportPage = () => {
  useAuth()
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState({});
  const [selectedReport, setSelectedReport] = useState(undefined);


  const handleOpenReportDialog = (report) => {
    setSelectedReport(report);
  }


  const handleCloseReportDialog = () => {
    setSelectedReport(undefined);
  }

  const { refetch, isLoading, error, data } = useQuery(
    ['reports', page, query],
    () => reportService.search({ pageNumber: page, pageSize: REPORT_PER_PAGE, q: query.q }),
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [page, query]);

  return (
    <Stack>
    <ReportDialog open={Boolean(selectedReport)} onClose={handleCloseReportDialog} report={selectedReport}/>
    <Grid container>
      <Grid item>

      </Grid>
    </Grid>
      <ReportTable
      onSelect={handleOpenReportDialog}
        loading={isLoading}
        error={error}
        pageNumber={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        total={data?.data?.total || 0}
        reports={data?.data?.data}
      />
    </Stack>
  );
};

export default dynamic(() => Promise.resolve(ReportPage), { ssr: false });
