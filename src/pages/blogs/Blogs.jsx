import React, { useState } from 'react'
import CButton from '../../common/CButton'
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Add, DeleteOutline, EditOutlined, Search } from '@mui/icons-material'
import CDialog from '../../common/CDialog'
import AddBlog from './AddBlog'
import DataTable from '../../common/DataTable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosReq } from '../../../utils/axiosReq'
import { format } from 'date-fns'
import useAuth from '../../hook/useAuth'
import toast from 'react-hot-toast'
import EditBlog from './EditBlog'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editBlogData, setEditBlogData] = useState(null)


  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blog', search],
    queryFn: async () => {
      const res = await axiosReq.get('/blog/all', {
        params: {
          search: search
        }
      })
      return res.data
    }
  })


  const handleEditDialog = (data) => {
    setEditDialogOpen(true)
    setEditBlogData(data)
  }

  const columns = [
    {
      field: 'Title',
      headerName: 'Title',
      width: 300,
      renderCell: (params) => (
        <Stack gap={1} direction='row' alignItems='center' height='100%'>
          <img style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 5 }} src={params.row.image} alt="" />
          <Link to={`/dashboard/blog/${params.row._id}`}>
            <Typography sx={{ fontWeight: 600, color: 'text.main' }}>{params.row.title}</Typography>
          </Link>
        </Stack>
      ),
    },
    {
      field: 'Author',
      headerName: 'Author',
      width: 300,
      renderCell: (params) => (
        <Stack gap={1} direction='row' alignItems='center' height='100%'>
          <Avatar src={params.row.author.img} />
          <Box>
            {/* <Link to={`/dashboard/instructor/${params.row.author._id}`}> */}
            <Typography>@{params.row.author.username}</Typography>
            {/* </Link> */}
            <Typography>{params.row.author.email}</Typography>
          </Box>
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
          <Typography>{format(params.row.createdAt, 'dd MMM yyyy')}</Typography>
        </Stack>
      ),
    },
    {
      field: 'options',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Stack direction='row' alignItems='center' height='100%'>
          <IconButton onClick={() => handleEditDialog(params.row)}>
            <EditOutlined fontSize='small' />
          </IconButton>
        </Stack>
      ),
    },
  ];
  return (
    <Box maxWidth='xl'>

      <Box>
        <Typography variant='h5'>Blogs</Typography>
        <Typography variant='body2'>Total Blogs (10)</Typography>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems='center' justifyContent='space-between'>

        <Box mt={3} mb={2}>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add />} >Create</CButton>
      </Stack>

      {/* add  */}
      <CDialog disableOutsideClick={true} maxWidth='md' title='Add Blog' open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <AddBlog onClose={() => setAddDialogOpen(false)} />
      </CDialog>

      {/* edit dialog */}
      <CDialog disableOutsideClick={true} maxWidth='md' title='Edit Blog' open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <EditBlog onClose={() => setEditDialogOpen(false)} data={editBlogData} />
      </CDialog>

      <Box mt={4}>
        <DataTable
          rows={blogs || []}
          columns={columns}
          getRowId={(row) => row._id}
          rowHeight={70}
          loading={isLoading}
          noRowsLabel='No Blog Available'
        />
      </Box>
    </Box>
  )
}

export default Blogs