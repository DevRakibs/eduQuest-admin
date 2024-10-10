/* eslint-disable react/prop-types */
import { Avatar, Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CButton from '../../../common/CButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../../../utils/axiosReq';
import useAuth from '../../../hook/useAuth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const UpdateCourse = ({ course, onClose }) => {
  const [status, setStatus] = useState('');

  const { token } = useAuth()


  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (input) => axiosReq.put(`/course/update/${course._id}`, input, { headers: { Authorization: token } }),
    onSuccess: (res) => {
      toast.success(res.data);
      queryClient.invalidateQueries(['course']);
      onClose();
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  });

  const handleSaveCourseInfo = async () => {
    updateMutation.mutate({ status: status });
  }
  useEffect(() => {
    setStatus(course?.status ?? '')
  }, [course]);

  return (
    <Stack gap={2}>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems='center'>

        <Box display="flex" alignItems="center">
          <Avatar src={course?.cover || '/no-image.png'} sx={{ borderRadius: '4px', mr: 1 }} />
          <Box>
            <Link to={`/admin/course/${course?._id}`} style={{ textDecoration: 'none' }}>
              <Typography>{course?.title}</Typography>
            </Link>
            <Typography variant='body2' color='text.secondary'>{course?.category?.name}</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Avatar src={course?.instructor?.img ?? ''} sx={{ borderRadius: '4px', mr: 1 }} />
          <Box>
            <Link to={`/instructor/${course?.instructor?._id}`} style={{ textDecoration: 'none' }}>
              <Typography>@{course?.instructor?.username}</Typography>
            </Link>
            <Typography variant='body2' color='text.secondary'>{course?.instructor?.email}</Typography>
          </Box>
        </Box>
      </Stack>

      <FormControl size='small' fullWidth>
        <label>Status</label>
        <Select
          value={status || ''}
          onChange={e => setStatus(e.target.value)}
        >
          <MenuItem disabled value='pending'>Pending</MenuItem>
          <MenuItem value='active'>Active</MenuItem>
          <MenuItem value='inactive'>Inactive</MenuItem>
        </Select>
      </FormControl>

      <CButton loading={updateMutation.isPending} onClick={handleSaveCourseInfo} contained>Update</CButton>
    </Stack>
  );
};

export default UpdateCourse;