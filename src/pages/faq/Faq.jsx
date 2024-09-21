import { Box, Divider, FormControl, IconButton, InputLabel, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton'
import AddFaq from './AddFaq'
import CDialog from '../../common/CDialog'
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material'

const Faq = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <Box maxWidth='xl'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems='center' justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Frequently Asked Question</Typography>
          <Typography variant='body2'>Total FAQ (10)</Typography>
        </Box>
        <CButton onClick={() => setAddDialogOpen(true)} contained startIcon={<Add />} >Add</CButton>
      </Stack>

      <CDialog open={addDialogOpen}>
        <AddFaq onClose={() => setAddDialogOpen(false)} />
      </CDialog>

      <Stack mt={4}>
        <Stack sx={{
          maxWidth: '600px',
          borderRadius: '8px',
          border: '1px solid lightgray',
          bgcolor: '#fff'
        }}>
          <Stack p={1.5} direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6'>আমি শুধু HTML, CSS জানি, সেক্ষেত্রে আমি এখন কি করবো?</Typography>
            <Stack direction='row'>
              <IconButton><EditOutlined fontSize='small' /></IconButton>
              <IconButton><DeleteOutline fontSize='small' /></IconButton>
            </Stack>
          </Stack>
          <Divider />
          <Typography p={1.5} variant='body2'>আপনি কি দিয়ে শুরু করবেন এটা ডিপেন্ড করবে আপনার কারেন্ট একটিভিটির উপরে আর আপনার চাহিদার উপরে, আপনার চাহিদা যদি এমন হয় যে খুব দ্রুত আরনিং করতে হবে তাহলে বলবো যে ওয়ার্ডপ্রেসই বেস্ট আপনার জন্য, আর আপনি যদি CSE ব্যাকগ্রাউন্ডের হন বা আপনি যদি প্রোগ্রামিং পেসনেটেড হন এবং আপনার হাতে যদি পর্যাপ্ত সময় থাকে তাহলে বলবো যে JavaScript বা Laravel দিয়ে শুরু করাই বেস্ট হবে।</Typography>
        </Stack>
      </Stack>

    </Box>
  )
}

export default Faq