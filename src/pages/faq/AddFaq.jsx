import React, { useState } from 'react';
import { Button, Box, Typography, Stack, IconButton, Avatar } from '@mui/material';
import { Close } from '@mui/icons-material';
import CTextField from '../../common/CTextField';
import CButton from '../../common/CButton';

const AddFaq = ({ onClose }) => {
  const [payload, setPayload] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('saved:', payload);
  };

  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Add FAQ</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>

      <Stack gap={2}>
        <CTextField
          topLabel="title"
          size='small'
          name="title"
          value={payload.title}
          onChange={handleChange}
          required
        />
        <CTextField
          topLabel="Description"
          size='small'
          multiline
          rows={8}
          name="description"
          value={payload.description}
          onChange={handleChange}
          required
        />
        <CButton contained onClick={handleSave}>
          Add
        </CButton>
      </Stack>
    </Box >
  );
};

export default AddFaq;
