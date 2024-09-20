import { Add, DeleteOutline, Edit, EditOutlined, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Chip, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../common/CButton'
import DataTable from '../../../common/DataTable';
import { Link } from 'react-router-dom';

const rows = [
  {
    id: 1,
    courseName: { initials: 'RD', name: 'Responsive Design', color: '#8e6ac8' },
    category: 'Web Development',
    instructor: 'Alex Ashley',
    lesson: 32,
    enrolment: 25,
    status: 'Active',
    price: '$30',
    deadline: '20.4.2021',
  },
  {
    id: 2,
    courseName: { initials: 'AD', name: 'Android Development', color: '#26c6da' },
    category: 'Mobile Application',
    instructor: 'Michael Wood',
    lesson: 11,
    enrolment: 7,
    status: 'Pending',
    price: '$65',
    deadline: '10.5.2021',
  },
  {
    id: 3,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 4,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 5,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 6,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 7,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 8,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 9,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 10,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 11,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 12,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 13,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
  {
    id: 14,
    courseName: { initials: 'UD', name: 'UI/UX Design', color: '#ffb300' },
    category: 'Graphics Design',
    instructor: 'Abu Bin Istiak',
    lesson: 12,
    enrolment: 8,
    status: 'Active',
    price: '$20',
    deadline: '15.4.2021',
  },
];


const CourseList = () => {
  const [category, setCategory] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'courseName',
      headerName: 'Course Name',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height='100%'>
          <Avatar sx={{ bgcolor: params.value.color, mr: 1 }}>{params.value.initials}</Avatar>
          <Typography>{params.value.name}</Typography>
        </Box>
      ),
    },
    { field: 'category', headerName: 'Category', width: 200 },
    { field: 'instructor', headerName: 'Instructor', width: 150 },
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
    <Box maxWidth='1600px'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Courses</Typography>
          <Typography variant='body2'>Total Courses (10)</Typography>
        </Box>

        <Stack direction='row' gap={2} alignItems='center'>
          <Box sx={{ minWidth: 220 }} >
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
          <Link to='add'>
            <CButton contained startIcon={<Add />} >Add Course</CButton>
          </Link>
        </Stack>
      </Stack>

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

export default CourseList