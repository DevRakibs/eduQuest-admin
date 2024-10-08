import { Add, DeleteOutline, Edit, EditOutlined, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Chip, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton'
import DataTable from '../../common/DataTable';
import { Link } from 'react-router-dom';
import CDialog from '../../common/CDialog';
import EnrollStudent from './EnrollStudent';

const rows = [
  {
    id: 1,
    name: 'Frensis Burner',
    username: 'frensis3232',
    email: 'dem01234@gmail.com',
    phone: '4234624233',
    enrolledCourse: 'UI/UX Design with Adobe XD',
    enrollmentDate: '12/02/2024',
    status: 'Pending',
  },
];


const Enrolment = () => {
  const [status, setStatus] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const handleDialog = () => setAddDialogOpen(p => !p)

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'Students',
      headerName: 'Students',
      width: 250,
      renderCell: (params) => (
        <Stack gap={1} direction='row' alignItems='center' height='100%'>
          <Avatar />
          <Box>
            <Typography sx={{ fontWeight: 600, color: 'text.main' }}>{params.row.name}</Typography>
            <Typography>{params.row.username}</Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: 'Info',
      headerName: 'Info',
      width: 200,
      renderCell: (params) => (
        <Stack justifyContent='center' height='100%'>
          <Typography sx={{ fontWeight: 600, color: 'text.main' }}>{params.row.email}</Typography>
          <Typography variant='body2'>{params.row.phone}</Typography>
        </Stack>
      ),
    },
    {
      field: 'EnrolledCourse',
      headerName: 'Enrolled Course',
      width: 250,
      renderCell: (params) => (
        <Stack justifyContent='center' height='100%'>
          <Typography sx={{ color: 'Highlight' }}>{params.row.enrolledCourse}</Typography>
        </Stack>
      ),
    },
    {
      field: 'EnrollmentDate',
      headerName: 'Enrollment Date',
      width: 250,
      renderCell: (params) => (
        <Stack justifyContent='center' height='100%'>
          <Typography>{params.row.enrollmentDate}</Typography>
        </Stack>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} color={params.value === 'Active' ? 'success' : 'warning'} />
      ),
    },
    {
      field: 'options',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Stack direction='row' alignItems='center' height='100%'>
          <IconButton>
            <EditOutlined fontSize='small' />
          </IconButton>
          <IconButton>
            <DeleteOutline fontSize='small' />
          </IconButton>
        </Stack>
      ),
    },
  ];


  return (
    <Box maxWidth='xl'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Enrollment List</Typography>
          <Typography variant='body2'>Total Enrollments (10)</Typography>
        </Box>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='space-between'>
          <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={10}>None</MenuItem>
                <MenuItem value={10}>Pending</MenuItem>
                <MenuItem value={20}>Waiting</MenuItem>
                <MenuItem value={30}>Approved</MenuItem>
                <MenuItem value={30}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CButton onClick={handleDialog} contained startIcon={<Add />} >Enroll a Student</CButton>
        </Stack>
      </Stack>

      {/* add student  */}
      <CDialog open={addDialogOpen} title='Enroll a Student' onClose={handleDialog}>
        <EnrollStudent onClose={handleDialog} />
      </CDialog>

      <Box mt={4}>
        <DataTable
          rows={rows}
          columns={columns}
          rowHeight={70}
          noRowsLabel='No Course Available'
        />
      </Box>

    </Box>
  )
}

export default Enrolment