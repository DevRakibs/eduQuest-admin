import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, MenuItem, Stack, IconButton, Avatar, Autocomplete } from '@mui/material';
import { Close } from '@mui/icons-material';
import CTextField from '../../common/CTextField';
import CButton from '../../common/CButton';

const AddStudent = ({ onClose }) => {
  const [payload, setPayload] = useState({
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
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Instructor saved:', payload);
  };

  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Add Student</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>

      <Stack gap={2}>
        <Stack direction='row' gap={2}>
          <Avatar />
          <Button variant='outlined' type='label'>
            <input type="file" />
          </Button>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <CTextField
            topLabel="First Name"
            size='small'
            name="firstName"
            value={payload.firstName}
            onChange={handleChange}
            required
          />
          <CTextField
            topLabel="Last Name"
            size='small'
            name="lastName"
            value={payload.lastName}
            onChange={handleChange}
            required
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <CTextField
            topLabel="User Name"
            size='small'
            name="username"
            value={payload.username}
            onChange={handleChange}
            fullWidth
            required
          />
          <CTextField
            topLabel="Email Address"
            size='small'
            name="email"
            type="email"
            value={payload.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Stack>

        {/* course to enrole */}
        {/* added for */}
        <Autocomplete
          size='small'
          options={[]}
          onChange={(_, value) => null}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Stack>
                <Typography>{option.name}</Typography>
                <Typography sx={{ fontSize: '12px' }}>{option.email}</Typography>
              </Stack>
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Course to Enroll" />
          )}
        />

        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <CTextField
            topLabel="Phone Number"
            size='small'
            name="phone"
            variant="outlined"
            value={payload.phone}
            onChange={handleChange}
            required
          />
          <CTextField
            topLabel="Address"
            size='small'
            name="address"
            value={payload.address}
            onChange={handleChange}
            required
          />
        </Stack>


        <CTextField
          topLabel="Date of Birth"
          size='small'
          name="birthDate"
          type='date'
          value={payload.about}
          onChange={handleChange}
        />
        <CTextField
          topLabel="About Student"
          size='small'
          name="about"
          value={payload.about}
          onChange={handleChange}
          multiline
          rows={3}
        />

        <CButton contained onClick={handleSave}>
          Add Student
        </CButton>
      </Stack>
    </Box >
  );
};

export default AddStudent;
