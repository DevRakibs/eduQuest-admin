import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, MenuItem, Stack, IconButton, Avatar } from '@mui/material';
import { Close } from '@mui/icons-material';
import CTextField from '../../common/CTextField';
import CButton from '../../common/CButton';

const AddInstructor = ({ onClose }) => {
  const [instructor, setInstructor] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    about: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Instructor saved:', instructor);
  };

  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Add Instructor</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>

      <Stack gap={2}>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar />
          <input accept="image/*" hidden id="file" type="file" />
          <label htmlFor="file">
            <Button size='small' variant="outlined" component="span">
              Upload
            </Button>
          </label>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <CTextField
            topLabel="First Name"
            size='small'
            name="firstName"
            value={instructor.firstName}
            onChange={handleChange}
            required
          />
          <CTextField
            topLabel="Last Name"
            size='small'
            name="lastName"
            value={instructor.lastName}
            onChange={handleChange}
            required
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <CTextField
            topLabel="User Name"
            size='small'
            name="username"
            value={instructor.username}
            onChange={handleChange}
            fullWidth
            required
          />
          <CTextField
            topLabel="Email Address"
            size='small'
            name="email"
            type="email"
            value={instructor.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <CTextField
            topLabel="Phone Number"
            size='small'
            name="phone"
            variant="outlined"
            value={instructor.phone}
            onChange={handleChange}
            required
          />
          <CTextField
            topLabel="Address"
            size='small'
            name="address"
            value={instructor.address}
            onChange={handleChange}
            required
          />
        </Stack>


        <CTextField
          topLabel="About Instructor"
          size='small'
          name="about"
          value={instructor.about}
          onChange={handleChange}
          multiline
          rows={3}
        />

        <CButton contained onClick={handleSave}>
          Add Instructor
        </CButton>
      </Stack>
    </Box >
  );
};

export default AddInstructor;
