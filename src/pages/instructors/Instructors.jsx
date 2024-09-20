import { Add, DeleteOutline, Edit, EditOutlined, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Chip, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton'
import DataTable from '../../common/DataTable';
import { Link } from 'react-router-dom';
import CDialog from '../../common/CDialog';
import AddInstructor from './AddInstructor';

const rows = [
  {
    id: 1,
    info: { name: 'Joe Larson', email: 'demo123@mail.com', phone: 8236382 },
    activeCourse: 12,
    status: 'Active',
  },
];


const Instructors = () => {
  const [filter, setFilters] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: (params) => <Link
        style={{ textDecoration: 'none' }}
        to={`${params.row.id}`}>
        # {params.row.id}
      </Link>
    },
    {
      field: 'Instructor',
      headerName: 'Instructor',
      width: 250,
      renderCell: (params) => (
        <Stack direction='row' gap={1} alignItems="center" height='100%'>
          <Avatar />
          <Box>
            <Typography sx={{ fontWeight: 600 }}>{params.row.info.name}</Typography>
            <Typography>{params.row.info.email}</Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      width: 200,
      renderCell: (params) => params.row.info.phone,
    },
    {
      field: 'ActiveCourse',
      headerName: 'Active Course',
      width: 200,
      renderCell: (params) => `${params.row.activeCourse} Active Course`,
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
          <Typography variant='h5'>Instructors</Typography>
          <Typography variant='body2'>Total Instructors (10)</Typography>
        </Box>

        <Stack direction='row' gap={2} alignItems='center'>
          <Box sx={{ minWidth: 150 }} >
            <FormControl fullWidth size='small'>
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
            </FormControl>
          </Box>
          <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add />} >Add Instructor</CButton>
        </Stack>
      </Stack>

      {/* add instructor  */}
      <CDialog open={addDialogOpen}>
        <AddInstructor onClose={() => setAddDialogOpen(false)} />
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

export default Instructors