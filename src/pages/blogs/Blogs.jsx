import React, { useState } from 'react'
import CButton from '../../common/CButton'
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material'
import CDialog from '../../common/CDialog'
import AddBlog from './AddBlog'
import DataTable from '../../common/DataTable'

const Blogs = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('')

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'Title',
      headerName: 'Title',
      width: 250,
      renderCell: (params) => (
        <Stack gap={1} direction='row' alignItems='center' height='100%'>
          <img src="" alt="" />
          <Typography sx={{ fontWeight: 600, color: 'text.main' }}>{params.row.title}</Typography>
        </Stack>
      ),
    },
    {
      field: 'Category',
      headerName: 'Category',
      width: 200,
      renderCell: (params) => (
        <Stack justifyContent='center' height='100%'>
          <Typography sx={{ fontWeight: 600, color: 'text.main' }}>{params.row.category}</Typography>
        </Stack>
      ),
    },
    {
      field: 'Published On',
      headerName: 'Published On',
      width: 250,
      renderCell: (params) => (
        <Stack justifyContent='center' height='100%'>
          <Typography>{params.row.enrollmentDate}</Typography>
        </Stack>
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
          <Typography variant='h5'>Blogs</Typography>
          <Typography variant='body2'>Total Blogs (10)</Typography>
        </Box>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='space-between'>
          <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth size='small'>
              <InputLabel>Filter</InputLabel>
              <Select
                value={categoryFilter}
                label="Filter"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value={10}>All</MenuItem>
                <MenuItem value={10}>Web Development</MenuItem>
                <MenuItem value={20}>Testing</MenuItem>
                <MenuItem value={30}>Education</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add />} >Create</CButton>
        </Stack>
      </Stack>

      {/* add student  */}
      <CDialog open={addDialogOpen}>
        <AddBlog onClose={() => setAddDialogOpen(false)} />
      </CDialog>

      <Box mt={4}>
        <DataTable
          rows={[]}
          columns={columns}
          rowHeight={70}
          noRowsLabel='No Blog Available'
        />
      </Box>
    </Box>
  )
}

export default Blogs