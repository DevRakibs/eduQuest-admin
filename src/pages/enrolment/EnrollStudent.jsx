import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, MenuItem, Stack, IconButton, Avatar, Autocomplete, FormControl, InputLabel, Select } from '@mui/material';
import { Close } from '@mui/icons-material';
import CTextField from '../../common/CTextField';
import CButton from '../../common/CButton';

const EnrollStudent = ({ onClose }) => {
  const [selectPayment, setSelectPayment] = useState('')
  const [status, setStatus] = useState('')
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
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Enroll a Student</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>

      <Stack gap={2}>
        {/* select student */}
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
            <TextField {...params} label="Select a Student" />
          )}
        />
        {/* course to enrole */}
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
        {/* select payment method */}
        <Box sx={{ minWidth: 220 }} >
          <FormControl fullWidth size='small'>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={selectPayment}
              label="Payment Method"
              onChange={(e) => setSelectPayment(e.target.value)}
            >
              <MenuItem value={10}>None</MenuItem>
              <MenuItem value={10}>Bkash</MenuItem>
              <MenuItem value={20}>Nagad</MenuItem>
              <MenuItem value={30}>Cash</MenuItem>
              <MenuItem value={30}>Bank</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 220 }} >
          <FormControl fullWidth size='small'>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={10}>Pending</MenuItem>
              <MenuItem value={20}>Waiting</MenuItem>
              <MenuItem value={30}>Approved</MenuItem>
              <MenuItem value={30}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <CButton contained onClick={handleSave}>
          Enroll Student
        </CButton>
      </Stack>
    </Box >
  );
};

export default EnrollStudent;
