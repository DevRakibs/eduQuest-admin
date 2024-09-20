import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, MenuItem, Stack, IconButton, Avatar, Autocomplete } from '@mui/material';
import { Close } from '@mui/icons-material';
import CTextField from '../../common/CTextField';
import CButton from '../../common/CButton';

const AddResourse = ({ onClose }) => {
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
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Add Resourse</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>

      <Stack gap={2}>
        <CTextField
          topLabel="File Url"
          size='small'
          name="url"
          value={instructor.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <CTextField
          topLabel="Resourse Name"
          size='small'
          name="name"
          value={instructor.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <CTextField
          topLabel="Version"
          size='small'
          name="version"
          value={instructor.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <Autocomplete
          sx={{ mt: 1 }}
          size='small'
          freeSolo
          options={['Plugins', 'Wordpress Theme',]}
          onChange={(_, value) => null}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Stack>
                <Typography>{option}</Typography>
              </Stack>
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Category" />
          )}
        />

        <CButton contained onClick={handleSave}>
          Add Resourse
        </CButton>
      </Stack>
    </Box >
  );
};

export default AddResourse;
