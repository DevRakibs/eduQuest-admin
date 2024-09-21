import { Box, Button, Container, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Add, ContentCopyOutlined, DeleteOutline, DownloadOutlined, EditOutlined, GetAppOutlined, InsertDriveFileOutlined, Person2Outlined } from '@mui/icons-material'
import useIsMobile from '../../hook/useIsMobile'
import DataTable from '../../common/DataTable'
import CButton from '../../common/CButton'
import CDialog from '../../common/CDialog'
import AddResourse from './AddResourse'

const data = [
  {
    id: 1,
    title: '907 – Responsive Multi-Purpose WordPress Theme',
    category: 'Theme',
    updateOn: 'January 20, 2022',
    version: '5.1.5'
  },
  {
    id: 2,
    title: 'Add To Cart Redirect for WooCommerce',
    category: 'Plugins',
    updateOn: 'January 20, 2022',
    version: '3.4.0'
  },
  {
    id: 3,
    title: 'AdForest – Classified Ads WordPress Theme',
    category: 'Themes',
    updateOn: 'January 20, 2022',
    version: '2.0.2'
  },
  {
    id: 4,
    title: 'Avada | Website Builder For WordPress & WooCommerce',
    category: 'Themes',
    updateOn: 'January 20, 2022',
    version: '2.0.2'
  },
  {
    id: 5,
    title: 'Avada | Website Builder For WordPress & WooCommerce',
    category: 'Themes',
    updateOn: 'January 20, 2022',
    version: '2.0.2'
  },
  {
    id: 6,
    title: 'Avada | Website Builder For WordPress & WooCommerce',
    category: 'Themes',
    updateOn: 'January 20, 2022',
    version: '2.0.2'
  },
]

const Resourse = () => {
  const [category, setCategory] = useState('')
  const [addDialogOpen, setAddDialogOpen] = useState(false)


  const columns = [
    {
      field: 'Files', headerName: 'Files', width: 500,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' gap={1.5} alignItems='center'>
          <img style={{ width: '30px' }} src="/file2.svg" alt="" />
          <Stack >
            <Typography sx={{ fontSize: '14px' }}>{params.row.title}</Typography>
            <Stack direction='row' gap={2} alignItems='center'>
              <Stack direction='row' gap={2}>
                <Typography sx={{ fontSize: '12px', display: 'inline-flex', gap: .5, alignItems: 'center' }}>
                  <ContentCopyOutlined sx={{ fontSize: '12px' }} /> 1 files(s)
                </Typography>
              </Stack>
              <Stack direction='row' gap={2}>
                <Typography sx={{ fontSize: '12px', display: 'inline-flex', gap: .5, alignItems: 'center' }}>
                  <GetAppOutlined sx={{ fontSize: '12px' }} /> 292 downloads
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )
    },
    {
      field: 'Categories', headerName: 'Categories', width: 200,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
          <Typography>{params.row.category}</Typography>
        </Stack>
      )
    },
    {
      field: 'updateOn', headerName: 'Update On', width: 200,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
          <Typography>{params.row.updateOn}</Typography>
        </Stack>
      )
    },
    {
      field: 'version', headerName: 'Version', width: 150,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          <Typography>{params.row.version}</Typography>
        </Stack>
      )
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
    {
      field: 'Download', headerName: '', width: 150,
      renderCell: (params) => <IconButton><DownloadOutlined fontSize='small' /></IconButton>
    },
  ];
  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Resourses</Typography>
          <Typography variant='body2'>Total Resourses (10)</Typography>
        </Box>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='space-between'>
          <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth size='small'>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={10}>All</MenuItem>
                <MenuItem value={20}>Wordpress theme</MenuItem>
                <MenuItem value={30}>Plugins</MenuItem>
                <MenuItem value={40}>Premuim theme</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add />} >Add</CButton>
        </Stack>
      </Stack>

      <CDialog open={addDialogOpen}>
        <AddResourse onClose={() => setAddDialogOpen(false)} />
      </CDialog>

      <Box mt={4}>
        <DataTable columns={columns} rows={data} />
      </Box>
    </Box>
  )
}

export default Resourse