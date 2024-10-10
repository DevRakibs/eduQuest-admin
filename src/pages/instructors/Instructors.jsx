import { Add, DeleteOutline, Edit, EditOutlined, MoreVert, Search } from '@mui/icons-material'
import { Avatar, Box, Chip, FormControl, IconButton, InputAdornment, InputLabel, Menu, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton'
import DataTable from '../../common/DataTable';
import { Link } from 'react-router-dom';
import CDialog from '../../common/CDialog';
import AddInstructor from './AddInstructor';
import { axiosReq } from '../../../utils/axiosReq';
import { useQuery } from '@tanstack/react-query';
import EditInstructor from './EditInstructor';


const Instructors = () => {
  const [filter, setFilters] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [instructor, setInstructor] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: instructors, isLoading } = useQuery({
    queryKey: ['instructor'],
    queryFn: () => axiosReq.get('/instructor/all')
  })

  const handleDialog = () => setEditDialogOpen(false)

  const handleEdit = (instructor) => {
    setInstructor(instructor);
    setEditDialogOpen(true);
  }


  const columns = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   width: 220,
    //   renderCell: (params) => <Link
    //     style={{ textDecoration: 'none' }}
    //     to={`/instructors/${params.row._id}`}>
    //     {params.row._id}
    //   </Link>
    // },
    {
      field: 'Instructor',
      headerName: 'Instructor',
      width: 300,
      renderCell: (params) => (
        <Stack direction='row' gap={1} alignItems="center" height='100%'>
          <Avatar src={params.row.img} />
          <Box>
            <Link to={`${params.row._id}`}>
              <Typography sx={{ fontWeight: 600 }}>{params.row.username}</Typography>
            </Link>
            <Typography>{params.row.email}</Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      width: 200,
      renderCell: (params) => params.row.phone,
    },
    {
      field: 'ActiveCourse',
      headerName: 'Active Course',
      width: 200,
      renderCell: (params) => {
        const activeCourses = params.row.courses.filter(course => course.status === 'active');
        return activeCourses.length

      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.row.isVerified ? 'Verified' : 'Unverified'} color={params.row.isVerified ? 'success' : 'warning'} />
      ),
    },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 150,
    //   renderCell: (params) => (
    //     <Chip label={params.value} color={params.value === 'Active' ? 'success' : 'warning'} />
    //   ),
    // },
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
    <Box maxWidth='xl'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Instructors</Typography>
          <Typography variant='body2'>Total Instructors (10)</Typography>
        </Box>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='space-between'>
          <Box sx={{ minWidth: 150 }} >
            {/* <FormControl fullWidth size='small'>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilters(e.target.value)}
              >
                <MenuItem value={10}>None</MenuItem>
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>Inactive</MenuItem>
                <MenuItem value={20}>Blocked</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
          <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add />} >Add a Instructor</CButton>
        </Stack>
      </Stack>

      {/* add instructor  */}
      <CDialog open={addDialogOpen} title='Add Instructor' onClose={() => setAddDialogOpen(false)}>
        <AddInstructor onClose={() => setAddDialogOpen(false)} />
      </CDialog>

      {/* edit instructor */}
      <CDialog open={editDialogOpen} title='Edit Instructor' onClose={handleDialog}>
        <EditInstructor data={instructor} onClose={handleDialog} />
      </CDialog>

      <Box mt={3} mb={2}>
        <TextField
          size="small"
          placeholder="Search Instructor..."
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
          rows={instructors?.data || []}
          columns={columns}
          rowHeight={70}
          loading={isLoading}
          getRowId={(row) => row._id}
          noRowsLabel='No Instructor Available'
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>

    </Box>
  )
}

export default Instructors