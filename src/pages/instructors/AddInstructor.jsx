import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, MenuItem, Stack, IconButton, Avatar } from '@mui/material';
import { Close } from '@mui/icons-material';
import CTextField from '../../common/CTextField';
import CButton from '../../common/CButton';
import toast from 'react-hot-toast';
import { uploadImage } from '../../../utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../../utils/axiosReq';
import useAuth from '../../hook/useAuth';

const AddInstructor = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [imgUploading, setImgUploading] = useState(false)
  const [instructor, setInstructor] = useState({
    name: '',
    username: '',
    role: 'instructor',
    email: '',
    phone: '',
    address: '',
    about: '',
    img: ''
  });

  const { token } = useAuth()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (input) => axiosReq.post('/auth/admin-create-user', input, { headers: { Authorization: token } }),
    onSuccess: (res) => {
      toast.success(res.data);
      queryClient.invalidateQueries(['instructor'])
      onClose()
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!instructor.username) {
      toast.error('User name required');
      return;
    }
    if (!instructor.email) {
      toast.error('Email required');
      return;
    }
    if (!instructor.phone) {
      toast.error('Phone number required');
      return;
    }
    let imgUrl = ''
    if (file) {
      setImgUploading(true)
      const { secure_url } = await uploadImage(file);
      imgUrl = secure_url;
      setImgUploading(false)
    }
    mutation.mutate({
      ...instructor,
      img: imgUrl
    })
  };

  return (
    <Box>
      <Stack gap={2}>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar src={file ? URL.createObjectURL(file) : ''} />
          <input accept="image/*" hidden id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="file">
            <Button size='small' variant="outlined" component="span">
              Upload
            </Button>
          </label>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <CTextField
            topLabel="Full Name"
            size='small'
            name="name"
            value={instructor.name}
            onChange={handleChange}
            required
          />
          <CTextField
            topLabel="User Name"
            size='small'
            name="username"
            value={instructor.username}
            onChange={handleChange}
            fullWidth
            required
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
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
          <CTextField
            topLabel="Phone Number"
            size='small'
            name="phone"
            variant="outlined"
            value={instructor.phone}
            onChange={handleChange}
            required
          />
        </Stack>

        <CTextField
          topLabel="Address"
          size='small'
          name="address"
          value={instructor.address}
          onChange={handleChange}
          required
        />

        <CTextField
          topLabel="About Instructor"
          size='small'
          name="about"
          value={instructor.about}
          onChange={handleChange}
          multiline
          rows={3}
        />

        <CButton loading={mutation.isPending || imgUploading} contained onClick={handleSave}>
          Add Instructor
        </CButton>
      </Stack>
    </Box >
  );
};

export default AddInstructor;
