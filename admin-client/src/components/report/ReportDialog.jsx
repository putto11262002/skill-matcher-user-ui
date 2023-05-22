import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { upperCase } from 'lodash';

const ReportDialog = ({ open, onClose, report }) => {

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
            <DialogTitle component='div' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Typography variant='4' component='h4'>Report {report?._id}</Typography> <IconButton onClick={onClose}><CloseIcon /></IconButton></DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        {report?.category && <> <Typography sx={{ fontWeight: theme => theme.typography.fontWeightBold }}>Category:</Typography>
                           <Box> <Chip sx={{width: 'unset'}} label={upperCase(report?.category)}/></Box> </>}
                    </Stack>
                    <Stack spacing={1}>

                        {report?.source && <> <Typography sx={{ fontWeight: theme => theme.typography.fontWeightBold }}>Source:</Typography>
                            <Link href={`user/edit/${report?.source}`}><Typography sx={{ textDecoration: 'underline' }}>{report?.source}</Typography></Link></>}
                    </Stack>
                    <Stack spacing={1}>
                        {report?.target && <> <Typography sx={{ fontWeight: theme => theme.typography.fontWeightBold }}>Target:</Typography>
                            <Link href={`user/edit/${report?.source}`}><Typography sx={{ textDecoration: 'underline' }}>{report?.target}</Typography></Link></>}
                    </Stack>

                    <Stack spacing={1}>
                        {report?.message && <> <Typography sx={{ fontWeight: theme => theme.typography.fontWeightBold }}>Message:</Typography>
                        <Typography>{report?.message}</Typography> </>}
                    </Stack>


                </Stack>
            </DialogContent>

        </Dialog>
    )
}

export default ReportDialog