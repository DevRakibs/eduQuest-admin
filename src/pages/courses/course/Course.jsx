import { Add, DeleteOutline, Edit, EditOutlined, MoreVert, Search } from '@mui/icons-material'
import { Avatar, Box, Chip, FormControl, IconButton, InputAdornment, InputLabel, Menu, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../common/CButton'
import DataTable from '../../../common/DataTable';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../../utils/axiosReq';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import CDialog from '../../../common/CDialog';
import EditInfo from './EditInfo';
import AddInfo from './AddInfo';
import UpdateCourse from './UpdateCourse';


const Course = () => {
  const [category, setCategory] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [course, setCourse] = useState(null);

  const { data: courses, isLoading } = useQuery({
    queryKey: ['course'],
    queryFn: () => axiosReq.get('/course/all')
  })

  function handleEdit(course) {
    setEditDialogOpen(true);
    setCourse(course);
  }

  const handleDialog = () => setEditDialogOpen(false)

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 100,
      renderCell: (params) => <Link
        style={{ textDecoration: 'none' }}
        to={`${params.row._id}`}>
        # {params.row._id}
      </Link>
    },
    {
      field: 'course',
      headerName: 'Course',
      width: 300,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height='100%'>
          <Avatar src={params.row.cover || '/no-image.png'} sx={{ borderRadius: '4px', mr: 1 }} />
          <Box>
            <Typography>{params.row.title}</Typography>
            <Typography variant='body2' color='text.secondary'>{params.row.category.name}</Typography>
          </Box>
        </Box>
      ),
    },

    {
      field: 'instructor',
      headerName: 'Instructor',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height='100%'>
          <Avatar src={params.row.instructor.img ?? ''} sx={{ mr: 1 }} />
          <Box>
            <Link to={`/instructor/${params.row.instructor._id}`} style={{ textDecoration: 'none' }}>
              <Typography>{params.row.instructor.username}</Typography>
            </Link>
            <Typography variant='body2' color='text.secondary'>{params.row.instructor.email}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 250,
      renderCell: (params) => (
        <Stack height='100%' justifyContent='center'>
          <Typography> <b>Start Date:</b> {format(params.row.startDate, 'dd-MMM-yyyy')}</Typography>
          <Typography> <b>End Date:</b> {format(params.row.endDate, 'dd-MMM-yyyy')}</Typography>
        </Stack>
      ),
    },

    {
      field: 'info',
      headerName: 'Info',
      width: 200,
      renderCell: (params) => (
        <Stack justifyContent="center" height='100%'>
          <Typography><b>Enrolled:</b> {params.row.studentsEnrolled.length}</Typography>
          <Typography><b>Price:</b> {params.row.price} tk</Typography>
        </Stack>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.row.status} color={params.row.status === 'active' ? 'success' : 'warning'} />
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
          <Typography variant='h5'>Courses</Typography>
          <Typography variant='body2'>Total Courses ({courses?.data?.length})</Typography>
        </Box>

        <Stack direction='row' gap={2} justifyContent='space-between' alignItems='center'>
          <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth size='small'>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={10}>None</MenuItem>
                <MenuItem value={10}>Web Development</MenuItem>
                <MenuItem value={20}>Graphic Design</MenuItem>
                <MenuItem value={30}>Marketing</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CButton contained startIcon={<Add />} onClick={() => setAddDialogOpen(true)} >Add Course</CButton>
        </Stack>
      </Stack>

      <Box mt={3} mb={2}>
        <TextField
          size="small"
          placeholder="Search Course..."
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
          rows={courses?.data || []}
          getRowId={(row) => row._id}
          columns={columns}
          loading={isLoading}
          rowHeight={70}
          noRowsLabel='No Course Available'
        />
      </Box>

      {/* Update course */}
      <CDialog maxWidth='md' open={editDialogOpen} title='Update Course' onClose={handleDialog}>
        <UpdateCourse course={course} onClose={handleDialog} />
      </CDialog>

      {/* add course */}
      <CDialog maxWidth='md' open={addDialogOpen} title='Add Course Info' onClose={() => setAddDialogOpen(false)}>
        <AddInfo onClose={() => setAddDialogOpen(false)} />
      </CDialog>
    </Box>
  )
}

export default Course