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
import useAuth from '../../hook/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../../utils/axiosReq';
import toast from 'react-hot-toast';
import { uploadImage } from '../../../utils/upload';

// Quill.register('modules/imageUploader', ImageUploader);

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  // imageUploader: {
  //   upload: (file) => {
  //     // Logic to upload the file to the server and return the URL
  //     return new Promise((resolve, reject) => {
  //       const formData = new FormData();
  //       formData.append('image', file);

  //       // Replace this URL with your API endpoint
  //       fetch('https://api.yoursite.com/upload', {
  //         method: 'POST',
  //         body: formData,
  //       })
  //         .then(response => response.json())
  //         .then(result => {
  //           resolve(result.url); // Resolve with the image URL
  //         })
  //         .catch(() => {
  //           reject('Upload failed');
  //         });
  //     });
  //   }
  // }
};

const AddBlog = ({ onClose }) => {
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [imgUploading, setImgUploading] = useState(false)
  const [payload, setPayload] = useState({
    title: '',
    category: '',
  });

  const { token } = useAuth()

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input) => axiosReq.post('/blog/create', input, { headers: { Authorization: token } }),
    onSuccess: (res) => {
      toast.success(res.data);
      queryClient.invalidateQueries(['course']);
      onClose();
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!file) return toast.error('Image is required');
    if (!payload.title) return toast.error('Title is required');
    if (!payload.category) return toast.error('Category is required');
    if (!content) return toast.error('Content is required');

    const blogData = {
      ...payload,
      content,
      image: ''
    };

    if (file) {
      setImgUploading(true);
      uploadImage(file)
        .then(({ secure_url }) => {
          blogData.image = secure_url;
          mutation.mutate(blogData);
        })
        .finally(() => setImgUploading(false));
    } else {
      mutation.mutate(blogData);
    }
  };

  return (
    <Box>

      <Stack gap={2}>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar src={file ? URL.createObjectURL(file) : ''} />
          <input onChange={e => setFile(e.target.files[0])} accept="image/*" hidden id="file" type="file" />
          <label htmlFor="file">
            <Button size='small' component="span">
              Add Image
            </Button>
          </label>
        </Stack>
        <CTextField
          topLabel="Blog Title"
          size='small'
          name="title"
          value={payload.title}
          onChange={handleChange}
        />
        <CTextField
          topLabel="Category"
          size='small'
          name="category"
          value={payload.category}
          onChange={handleChange}
        />

        <Stack mb={{ xs: 5, md: 0 }}>
          <label>Content</label>
          <ReactQuill
            style={{ height: '400px', marginBottom: '70px', borderRadius: '8px' }}
            value={content}
            onChange={e => setContent(e)}
            modules={modules}
            formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link', 'image', 'video']}
            placeholder="Write your blog content here..."
          />
        </Stack>

        <CButton loading={mutation.isPending || imgUploading} contained onClick={handleSave}>
          Create
        </CButton>
      </Stack>
    </Box >
  );
};

export default AddBlog;
