import { CloudUpload } from '@mui/icons-material'
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CButton from '../../../common/CButton'

const Profile = () => {
  const [logo, setLogo] = useState('')
  const [editOn, setEditOn] = useState(false)
  const [payload, setPayload] = useState({
    address: '',
    contact: '',
    email: '',
    formationDate: '',
    logoUrl: '',
    name: '',
    slogan: '',
  })

  const handleInputChange = (e) => { }

  return (
    <Box sx={{ minHeight: '600px' }} maxWidth='xl'>
      <Typography variant='h5' mb={1}>My Details</Typography>
      <Typography variant='body'>Please fill full details about yourself</Typography>
      <Stack direction='row' gap={2} alignItems='center' mb={2} mt={4}>
        <Avatar sx={{
          width: '80px',
          height: '80px'
        }} />
        <Stack>
          <Typography variant='h6'>Profile image <span style={{ fontSize: '12px', fontWeight: 400 }}>( jpg / png ) (Max 500KB)</span> </Typography>
          <Button
            sx={{ width: 'fit-content' }}
            component="label"
            role={undefined}
            disabled={!editOn}
            startIcon={<CloudUpload />}
          >
            Upload file
            <input onChange={(e) => {
              const file = e.target.files[0];
              const maxFileSize = 500 * 1024; // 500KB in bytes
              if (file.size > maxFileSize) {
                alert(`File ${file.name} is too large. Please select a file smaller than 500KB.`);
                return
              }
              setLogo(e.target.files[0])
            }} type="file" hidden />
          </Button>
        </Stack>
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 6 }} mb={2}>
        <Stack sx={{ flex: 1 }} gap={2}>
          <TextField variant='standard' disabled={!editOn} value={payload.name} onChange={handleInputChange} name='name' size='small' fullWidth label='First Name' />
          <TextField variant='standard' disabled={!editOn} value={payload.email} onChange={handleInputChange} name='email' size='small' fullWidth label='Email' />
        </Stack>
        <Stack sx={{ flex: 1 }} gap={2}>
          <TextField variant='standard' disabled={!editOn} value={payload.name} onChange={handleInputChange} name='name' size='small' fullWidth label='Last Name' />
          <TextField variant='standard' disabled={!editOn} value={payload.email} onChange={handleInputChange} name='email' size='small' fullWidth label='Phone number' />
        </Stack>
      </Stack>
      <TextField rows={4} multiline variant='standard' disabled={!editOn} value={payload.name} onChange={handleInputChange} name='bio' size='small' fullWidth label='Bio' />
      <Stack direction='row' justifyContent='space-between' mt={4}>
        <Box />
        {
          editOn ?
            <Stack direction='row' gap={2} alignItems='center'>
              <CButton onClick={() => setEditOn(false)} >Cancel</CButton>
              <CButton contained>Update</CButton>
            </Stack>
            : <CButton onClick={() => setEditOn(true)} contained>Edit Info</CButton>
        }
      </Stack>
    </Box>
  )
}

export default Profile