import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, MenuItem, Stack, IconButton, Avatar, Autocomplete } from '@mui/material';
import { Close } from '@mui/icons-material';
import CTextField from '../../common/CTextField';
import CButton from '../../common/CButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageUploader from 'quill-image-uploader';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

Quill.register('modules/imageUploader', ImageUploader);

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  imageUploader: {
    upload: (file) => {
      // Logic to upload the file to the server and return the URL
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        // Replace this URL with your API endpoint
        fetch('https://api.yoursite.com/upload', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(result => {
            resolve(result.url); // Resolve with the image URL
          })
          .catch(() => {
            reject('Upload failed');
          });
      });
    }
  }
};

const AddBlog = ({ onClose }) => {
  const [description, setDescription] = useState('')
  const [payload, setPayload] = useState({
    title: '',
    category: '',
    description: '',
    cover: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log(' saved:', payload);
  };

  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Add Blog</Typography>
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
              Add Cover
            </Button>
          </label>
        </Stack>
        <CTextField
          topLabel="Blog Title"
          size='small'
          name="title"
          value={payload.title}
          onChange={handleChange}
          required
        />

        <Autocomplete
          size='small'
          options={[]}
          freeSolo
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
            <TextField {...params} label="Category" />
          )}
        />

        <Stack mb={{ xs: 5, md: 0 }}>
          <label>Description</label>
          <ReactQuill
            style={{ height: '400px', marginBottom: '70px', borderRadius: '8px' }}
            value={description}
            onChange={e => setDescription(e.target.value)}
            modules={modules}
            formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link', 'image', 'video']}
            placeholder="Write your blog content here..."
          />
        </Stack>

        <CButton contained onClick={handleSave}>
          Create
        </CButton>
      </Stack>
    </Box >
  );
};

export default AddBlog;
