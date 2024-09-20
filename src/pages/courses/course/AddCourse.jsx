import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react';
import CButton from '../../../common/CButton';
import InfoInput from './InfoInput';
import ContentInput from './ContentInput';
import CTabPanel from '../../../common/CTabPanel';

const AddCourse = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#fff',
      p: 3,
      borderRadius: '16px',
    }} maxWidth='xl'>
      <Typography variant='h5' mb={2}>Create Course</Typography>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Course Info" />
        <Tab label="Course Content" />
      </Tabs>
      <CTabPanel value={value} index={0}>
        <InfoInput />
      </CTabPanel>
      <CTabPanel value={value} index={1}>
        <ContentInput />
      </CTabPanel>
    </Box >
  )
}

export default AddCourse