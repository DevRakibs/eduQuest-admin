import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../common/CButton'
import { Add } from '@mui/icons-material'
import CategoryCard from './CategoryCard'
import CDialog from '../../../common/CDialog'
import AddCategory from './AddCategory'

const Categories = () => {
  const [addCatDialogOpen, setAddCatDialogOpen] = useState(false)
  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems='center' justifyContent='space-between'>
        <Box>
          <Typography variant='h5'>Course Categories</Typography>
          <Typography variant='body2'>Total Catagories (4)</Typography>
        </Box>
        <CButton onClick={() => setAddCatDialogOpen(true)} contained startIcon={<Add />} >Add Catagories</CButton>
      </Stack>
      {/* add categroy */}
      <CDialog open={addCatDialogOpen}>
        <AddCategory onClose={() => setAddCatDialogOpen(false)} />
      </CDialog>
      <Stack direction='row' gap={4} flexWrap='wrap' mt={4}>
        {
          [1, 2, 3, 4, 5, 6].map(data => (
            <CategoryCard key={data} />
          ))
        }
      </Stack>
    </Box>
  )
}

export default Categories