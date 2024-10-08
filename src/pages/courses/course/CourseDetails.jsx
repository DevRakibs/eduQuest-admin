import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../../../utils/axiosReq'
import { useQuery } from '@tanstack/react-query'
import { Box, Typography, Grid, Card, CardContent, CardMedia, List, ListItem, ListItemText, Chip, Divider, Stack, Tabs, Tab } from '@mui/material'
import { format } from 'date-fns'
import CTabPanel from '../../../common/CTabPanel'
import CButton from '../../../common/CButton'
import EditInfo from './EditInfo'
import CDialog from '../../../common/CDialog'
import Loader from '../../../common/Loader'
import ErrorMsg from '../../../common/ErrorMsg'
import ContentDetails from './ContentDetails'

const CourseDetails = () => {
  const [value, setValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleDialog = () => setEditDialogOpen(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams()
  const { data: course, isLoading, isError } = useQuery({
    queryKey: ['course', id],
    queryFn: () => axiosReq.get(`/course/${id}`)
  })
  console.log('course', course)
  if (isLoading) return <Loader />
  if (isError) return <ErrorMsg />
  return (
    <Box maxWidth='md' sx={{
      bgcolor: '#fff',
      p: 4,
      minHeight: '100vh'
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <img
            src={course?.data.cover}
            alt={course?.data.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>

        <Grid item xs={12} sm={7}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {course?.data.title}
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>
              Price: ৳{course?.data.price}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              Start Date: {course?.data.startDate && format(new Date(course?.data.startDate), 'yyyy-MM-dd')} <br />
              End Date: {course?.data.endDate && format(new Date(course?.data.endDate), 'yyyy-MM-dd')}
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
              {course?.data.batchInfo.map((batch, index) => (
                <Box key={index}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {batch.title}:
                  </Typography>
                  <Typography variant="body1">{batch.description}</Typography>
                </Box>
              ))}
            </Stack>

            <Chip label={`Status: ${course?.data.status}`} color="warning" variant="outlined" sx={{ mt: 1 }} />
          </CardContent>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 3, mb: 3 }} />

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Course Info" />
        <Tab label="Course Content" />
      </Tabs>

      {/* Course Description */}
      <CTabPanel value={value} index={0}>
        <Box>
          <Stack direction='row' justifyContent='space-between'>
            <Box />
            <CButton onClick={() => setEditDialogOpen(true)} contained>Update</CButton>
          </Stack>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Course Description
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: course?.data.description }} />

          {/* What You'll Learn */}
          <Box sx={{ mt: 3, width: 'fit-content', border: '1px solid #e0e0e0', borderRadius: '8px', px: 4, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Includes in Course
            </Typography>
            <List>
              {course?.data.includes.map((item, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </CTabPanel>

      <CTabPanel value={value} index={1}>
        <ContentDetails course={course?.data} />
      </CTabPanel>

      <CDialog maxWidth='md' title='Update Course Info' open={editDialogOpen} onClose={handleDialog}>
        <EditInfo onClose={handleDialog} course={course?.data} />
      </CDialog>

    </Box>
  )
}

export default CourseDetails