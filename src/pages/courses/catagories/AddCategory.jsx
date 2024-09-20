import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, Typography, Stack } from '@mui/material';
import { Add as AddIcon, Close } from '@mui/icons-material';
import CTextField from '../../../common/CTextField';
import toast from 'react-hot-toast';

const AddCategory = ({ onClose }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [subCategory, setSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  function handleSubCategory() {
    if (subCategory === '') {
      toast.error('Please write a subcategory name')
      return
    }
    if (subCategory.trim()) {
      setSubCategories([...subCategories, subCategory]);
      setSubCategory('');
    }
  }

  const handleRemoveSubCategory = (index) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories.splice(index, 1);
    setSubCategories(updatedSubCategories);
  };

  const handleSave = () => {
    // Add save logic here
  };

  return (
    <Stack gap={2}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant="h6">Add Category</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>

      <CTextField
        size='small'
        topLabel="Category Name"
        variant="outlined"
        fullWidth
        required
      />

      <CTextField
        size='small'
        topLabel="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        required
      />

      <Stack direction='row' gap={2} alignItems='center'>
        <Button
          variant="outlined"
          component="label"
        >
          Choose Thumbnail
          <input
            type="file"
            hidden
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </Button>
        {thumbnail &&
          <img
            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail"
          />
        }
      </Stack>

      <Stack direction='row' flex={1} gap={2} alignItems='center'>
        <TextField
          onChange={e => setSubCategory(e.target.value)}
          size='small'
          value={subCategory}
          label="Subcategory"
          variant="outlined"
          fullWidth
        />
        <IconButton
          sx={{
            border: '1px solid lightgray',
            borderRadius: '4px',
          }}
          color="primary"
          onClick={handleSubCategory}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <Stack direction='row' flexWrap='wrap' gap={2}>
        {
          subCategories.map((item, index) => (
            <Typography
              key={index}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                border: '1px solid lightgray',
                px: 0.5,
                borderRadius: '4px'
              }}
            >
              {item}
              <IconButton
                size='small'
                onClick={() => handleRemoveSubCategory(index)}
              >
                <Close fontSize='small' />
              </IconButton>
            </Typography>
          ))
        }
      </Stack>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Category
      </Button>
    </Stack>
  );
};

export default AddCategory;
