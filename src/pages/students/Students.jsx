import { Add, DeleteOutline, Edit, EditOutlined, MoreVert, PhoneOutlined, Search } from '@mui/icons-material'
import { Avatar, Box, Chip, FormControl, IconButton, InputAdornment, InputLabel, Menu, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton'
import DataTable from '../../common/DataTable';
import { Link } from 'react-router-dom';
import CDialog from '../../common/CDialog';
import AddStudent from './AddStudent';
import { axiosReq } from '../../../utils/axiosReq';
import { useQuery } from '@tanstack/react-query';
import EditStudent from './EditStudent';

const rows = [
  {
    id: 1,
    name: 'Frensis Burner',
    username: 'frensis3232',
    email: 'dem01234@gmail.com',
    phone: '4234624233',
    enrolledCourse: 2,
    status: 'Active',
  },
];


const Students = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const { data: students, isLoading } = useQuery({
    queryKey: ['student'],
    queryFn: () => axiosReq.get('/student/all'),
  })

  const closeAddDialog = () => setAddDialogOpen(false)
  const closeEditDialog = () => setEditDialogOpen(false)
  const handleEdit = (row) => {
    setEditDialogOpen(true)
    setEditData(row)
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'Students',
      headerName: 'Students',
      width: 300,
      renderCell: (params) => (
        <Stack gap={1} direction='row' alignItems='center' height='100%'>
          <Avatar src={params.row.img ?? ''} />
          <Box>
            <Link to={`/student/${params.row._id}`} style={{ textDecoration: 'none' }}>
              <Typography sx={{ fontWeight: 600 }}>@{params.row.username}</Typography>
            </Link>
            <Typography>{params.row.email}</Typography>
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
          <Typography sx={{ fontWeight: 600 }}>{params.row.name}</Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}> <PhoneOutlined fontSize='small' sx={{ mr: 1 }} /> {params.row.phone}</Typography>
        </Stack>
      ),
    },
    {
      field: 'EnrolledCourse',
      headerName: 'Enrolled Course',
      width: 200,
      renderCell: (params) => (
        <Stack justifyContent='center' height='100%'>
          <Typography sx={{ fontWeight: 600 }}>{params.row.enrolledCourses?.length}</Typography>
        </Stack>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.row.isVerified ? 'Verified' : 'Unverified'} color={params.row.isVerified ? 'success' : 'warning'} />
      ),
    },
    {
      field: 'options',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Stack direction='row' alignItems='center' height='100%'>
          <IconButton onClick={() => handleEdit(params.row)} >
            <EditOutlined fontSize='small' />
          </IconButton>
        </Stack>
      ),
    },
  ];


  return (
    <Box maxWidth='1600px'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Students</Typography>
          <Typography variant='body2'>Total Students ({students?.data?.length})</Typography>
        </Box>

        <Stack direction='row' justifyContent='space-between' gap={2} alignItems='center'>
          {/* <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={10}>None</MenuItem>
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>Inactive</MenuItem>
                <MenuItem value={30}>Blocked</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add />} >Add a Student</CButton>
        </Stack>
      </Stack>

      {/* add student  */}
      <CDialog open={addDialogOpen} title='Add Student' onClose={closeAddDialog}>
        <AddStudent onClose={closeAddDialog} />
      </CDialog>

      <Box mt={3} mb={2}>
        <TextField
          size="small"
          placeholder="Search students..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box mt={4}>
        <DataTable
          rows={students?.data ?? []}
          columns={columns}
          loading={isLoading}
          rowHeight={70}
          getRowId={(row) => row._id}
          noRowsLabel='No Student Available'
        />
      </Box>

      {/* edit student */}
      <CDialog open={editDialogOpen} title='Edit Student' onClose={closeEditDialog}>
        <EditStudent data={editData} onClose={closeEditDialog} />
      </CDialog>

    </Box>
  )
}

export default Students