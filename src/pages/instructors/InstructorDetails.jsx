import { Box, Chip, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import CTabPanel from '../../common/CTabPanel';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import DataTable from '../../common/DataTable';


const PersonalInfo = () => {
  const user = {
    title: 'Mr.',
    fullName: 'Abu Bin Ishtiyak',
    surname: 'IO',
    dob: '10 Aug, 1980',
    mobile: '+811 758-756433',
    email: 'info@softnio.com',
    joiningDate: '08-16-2018 09:04PM',
    regMethod: 'Email',
    country: 'United State',
    nationality: 'United State',
  };

  return (
    <Box py={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Title
          </Typography>
          <Typography variant="body1">{user.title}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Full Name
          </Typography>
          <Typography variant="body1">{user.fullName}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Date of Birth
          </Typography>
          <Typography variant="body1">{user.dob}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Surname
          </Typography>
          <Typography variant="body1">{user.surname}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Mobile Number
          </Typography>
          <Typography variant="body1">{user.mobile}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Email Address
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            ADDITIONAL INFORMATION
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Joining Date
          </Typography>
          <Typography variant="body1">{user.joiningDate}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Reg Method
          </Typography>
          <Typography variant="body1">{user.regMethod}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Country
          </Typography>
          <Typography variant="body1">{user.country}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="textSecondary">
            Nationality
          </Typography>
          <Typography variant="body1">{user.nationality}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};


const Courses = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'courseName',
      headerName: 'Course Name',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height='100%'>
          <Typography>{params.value.name}</Typography>
        </Box>
      ),
    },
    { field: 'category', headerName: 'Category', width: 200 },
    {
      field: 'lesson',
      headerName: 'Lesson',
      width: 200,
      renderCell: (params) => `Total lesson: ${params.value}`,
    },
    {
      field: 'enrolment',
      headerName: 'Enrole Student',
      width: 200,
      renderCell: (params) => `Total enrolment: ${params.value}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} color={params.value === 'Active' ? 'success' : 'warning'} />
      ),
    },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'deadline', headerName: 'Deadline', width: 150 },
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
    <Box mt={4}>
      <DataTable
        rows={[]}
        columns={columns}
        rowHeight={70}
        noRowsLabel='No Course Available'
      />
    </Box>
  )
}

const InstructorDetails = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{
      bgcolor: '#fff',
      borderRadius: '8px',
      p: 3, minHeight: '70vh'
    }} maxWidth='xl'>

      <Box>
        <Typography variant='h5' mb={2}>Instructor/ <span style={{ fontWeight: 300, color: 'Highlight' }}>Joe Larson</span></Typography>
        <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
          <Tab label="Personal Info" />
          <Tab label="Courses" />
        </Tabs>
        <CTabPanel value={tabValue} index={0}>
          <PersonalInfo />
        </CTabPanel>
        <CTabPanel value={tabValue} index={1}>
          <Courses />
        </CTabPanel>
      </Box>

    </Box>
  )
}

export default InstructorDetails