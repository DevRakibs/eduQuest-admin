/* eslint-disable react/prop-types */
import { Autocomplete, Avatar, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageUploader from 'quill-image-uploader';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { Add, Close, Delete, KeyboardArrowDownOutlined, Upload } from '@mui/icons-material';
import CButton from '../../../common/CButton';
import CTextField from '../../../common/CTextField';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../../../utils/axiosReq';
import useAuth from '../../../hook/useAuth';
import toast from 'react-hot-toast';
import { deleteImage, uploadImage } from '../../../../utils/upload';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

Quill.register('modules/imageUploader', ImageUploader);

const quillModules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  imageUploader: {
    upload: file => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);
        fetch('https://api.yoursite.com/upload', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(result => resolve(result.url))
          .catch(() => reject('Upload failed'));
      });
    }
  }
};

const EditInfo = ({ course, onClose }) => {
  const [payload, setPayload] = useState({
    title: '',
    category: '',
    price: '',
    startDate: '',
    endDate: '',
    status: 'pending'
  });
  const [description, setDescription] = useState('');
  const [batchInfo, setBatchInfo] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [file, setFile] = useState(null);
  const [instructor, setInstructor] = useState('');

  const [errors, setErrors] = useState({});
  const [batchInfoPayload, setBatchInfoPayload] = useState({ title: '', description: '' });
  const [addBatchInfoSecOpen, setAddBatchInfoSecOpen] = useState(false);
  const [includesInCourseSecOpen, setIncludesInCourseSecOpen] = useState(false);
  const [includesTitle, setIncludesTitle] = useState('');
  const [imgUploading, setImgUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { token } = useAuth()

  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: () => axiosReq.get('/category/all'),
  })


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

  const deleteMutation = useMutation({
    mutationFn: () => axiosReq.delete(`/course/delete/${course._id}`, { headers: { Authorization: token } }),
    onSuccess: (res) => {
      toast.success(res.data);
      queryClient.invalidateQueries(['course']);
      setDeleteDialogOpen(false);
      onClose();
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  });
  const handleAddBatch = () => {
    if (batchInfoPayload.title && batchInfoPayload.description) {
      setBatchInfo([...batchInfo, { ...batchInfoPayload }]);
      setBatchInfoPayload({ title: '', description: '' });
    }
  };

  const handleDeleteBatch = index => {
    setBatchInfo(batchInfo?.filter((_, i) => i !== index));
  };

  const handleAddIncludes = () => {
    if (includesTitle) {
      setIncludes([...includes, includesTitle]);
      setIncludesTitle('');
    }
  };

  const handleDeleteIncludes = index => {
    setIncludes(includes?.filter((_, i) => i !== index));
  };

  const publicId = course.cover.split('/').pop().split('.')[0];

  const handleSaveCourseInfo = () => {
    const validateForm = () => {
      const newErrors = {};
      if (!payload.title) newErrors.title = 'Title is required';
      if (!payload.category) newErrors.category = 'Category is required';
      if (!payload.price) newErrors.price = 'Price is required';
      if (!payload.startDate) newErrors.startDate = 'Start Date is required';
      if (!payload.endDate) newErrors.endDate = 'End Date is required';
      // if (batchInfo.length === 0) newErrors.batchInfo = 'Please add at least one batch info';
      // if (includes.length === 0) newErrors.includes = 'Includes is required';
      if (!description) newErrors.description = 'Description is required';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (!validateForm()) {
      return;
    }

    const courseData = {
      ...payload,
      batchInfo,
      includes,
      description,
      cover: course?.cover
    };
    if (file) {
      setImgUploading(true);
      if (course?.cover) {
        deleteImage(publicId)
          .then(() => uploadImage(file))
          .then(({ secure_url }) => {
            courseData.cover = secure_url;
            updateMutation.mutate(courseData);
          })
          .finally(() => setImgUploading(false));
      }
    } else {
      updateMutation.mutate(courseData);
    }
  }

  const handleDeleteCourse = () => {
    deleteMutation.mutate();
    deleteImage(publicId)
    onClose();
  }

  useEffect(() => {
    setPayload({
      title: course.title ?? '',
      category: course.category._id ?? '',
      price: course.price ?? '',
      startDate: course.startDate ? format((course.startDate), 'yyyy-MM-dd') : '',
      endDate: course.endDate ? format((course.endDate), 'yyyy-MM-dd') : '',
    });
    setDescription(course.description);
    setInstructor(course.instructor);
    setBatchInfo(course.batchInfo);
    setIncludes(course.includes);
  }, [course]);

  return (
    <>
      <Stack gap={2}>

        <Box display="flex" alignItems="center">
          <Avatar src={course?.instructor?.img || '/no-image.png'} sx={{ borderRadius: '4px', mr: 1 }} />
          <Box>
            <Link to={`/instructor/${instructor?._id}`} style={{ textDecoration: 'none' }}>
              <Typography>{instructor?.username}</Typography>
            </Link>
            <Typography variant='body2' color='text.secondary'>{instructor?.email}</Typography>
          </Box>
        </Box>

        <CTextField
          value={payload.title}
          onChange={e => setPayload({ ...payload, title: e.target.value })}
          size='small'
          topLabel='Title'
          error={!!errors.title}
          helperText={errors.title}
        />
        <FormControl size='small' fullWidth error={!!errors.category}>
          <label>Category</label>
          <Select
            value={payload.category || ''}
            onChange={e => setPayload({ ...payload, category: e.target.value })}
          >
            {
              categories?.data.map(category => (
                <MenuItem key={category._id} value={category._id ?? ''}>{category.name}</MenuItem>
              ))
            }
          </Select>
          {errors.category && <Typography color="error" variant="caption">{errors.category}</Typography>}
        </FormControl>

        <CTextField
          value={payload.price}
          onChange={e => setPayload({ ...payload, price: e.target.value })}
          type='number'
          size='small'
          topLabel='Price'
          error={!!errors.price}
          helperText={errors.price}
        />
        <Stack direction='row' gap={2}>
          <CTextField
            value={payload.startDate}
            onChange={e => setPayload({ ...payload, startDate: e.target.value })}
            size='small'
            type='date'
            topLabel='Start Date'
            error={!!errors.startDate}
            helperText={errors.startDate}
          />
          <CTextField
            value={payload.endDate}
            onChange={e => setPayload({ ...payload, endDate: e.target.value })}
            size='small'
            type='date'
            topLabel='End Date'
            error={!!errors.endDate}
            helperText={errors.endDate}
          />
        </Stack>

        {/* Add Batch Information */}
        <CollapsibleSection
          title="Batch Information"
          isOpen={addBatchInfoSecOpen}
          setIsOpen={setAddBatchInfoSecOpen}
        >
          <CTextField
            size='small'
            fullWidth
            topLabel="Title"
            value={batchInfoPayload.title}
            onChange={e => setBatchInfoPayload({ ...batchInfoPayload, title: e.target.value })}
          />
          <CTextField
            sx={{ mb: 2 }}
            size='small'
            fullWidth
            topLabel="Description"
            value={batchInfoPayload.description}
            onChange={e => setBatchInfoPayload({ ...batchInfoPayload, description: e.target.value })}
          />
          <CButton
            outlined
            fullWidth
            startIcon={<Add />}
            onClick={handleAddBatch}
          >
            Add
          </CButton>
          <Box>
            {batchInfo.map((batch, index) => (
              <InfoItem
                key={index}
                title={batch.title}
                description={batch.description}
                onDelete={() => handleDeleteBatch(index)}
              />
            ))}
          </Box>
          {errors.batchInfo && <Typography color="error" variant="caption">{errors.batchInfo}</Typography>}
        </CollapsibleSection>

        {/* include in course */}
        <CollapsibleSection
          title="Includes in Course"
          isOpen={includesInCourseSecOpen}
          setIsOpen={setIncludesInCourseSecOpen}
        >
          <CTextField
            size='small'
            fullWidth
            topLabel="Title"
            value={includesTitle}
            onChange={e => setIncludesTitle(e.target.value)}
          />
          <CButton
            sx={{ mt: 2 }}
            outlined
            startIcon={<Add />}
            onClick={handleAddIncludes}
          >
            Add
          </CButton>
          <Box>
            {includes.map((item, index) => (
              <InfoItem
                key={index}
                title={item}
                onDelete={() => handleDeleteIncludes(index)}
              />
            ))}
          </Box>
          {errors.includes && <Typography color="error" variant="caption">{errors.includes}</Typography>}
        </CollapsibleSection>

        <Stack mb={{ xs: 5, md: 0 }}>
          <label>Description</label>
          <ReactQuill
            style={{ height: '400px', marginBottom: '50px', borderRadius: '8px' }}
            value={description}
            onChange={(e) => setDescription(e)}
            modules={quillModules}
            formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link', 'image', 'video']}
            placeholder="Write Description here..."
          />
          {errors.description && <Typography color="error" variant="caption">{errors.description}</Typography>}
        </Stack>

        <Stack>
          <Typography>Course Image</Typography>
          <Stack sx={{
            position: 'relative',
            border: '1px solid lightgray',
            p: '20px',
            borderRadius: '8px',
            minHeight: '200px'
          }} direction={{ xs: 'column', md: 'row' }} gap={3}>
            {(file || course?.cover) && (
              <>
                <Box flex={1}>
                  <img
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                    src={file ? URL.createObjectURL(file) : course?.cover}
                    alt=""
                  />
                </Box>
                {/* <IconButton
                onClick={() => setFile(null)}
                sx={{
                  position: 'absolute',
                  border: '1px solid lightgray',
                  bgcolor: '#fff',
                  top: 5,
                  left: 5,
                  ":hover": {
                    bgcolor: 'gray'
                  }
                }}
              >
                <Close />
              </IconButton> */}
              </>
            )}
            <Stack alignItems='center' justifyContent='center' gap={1} flex={1}>
              <Typography>jpg, png (max 500kb)</Typography>
              <Button variant='outlined' component='label' startIcon={<Upload />}>
                Click to upload
                <input onChange={e => setFile(e.target.files[0])} type="file" hidden />
              </Button>
            </Stack>
            {errors.file && <Typography color="error" variant="caption">{errors.file}</Typography>}
          </Stack>
        </Stack>
        <CButton loading={updateMutation.isPending || imgUploading} onClick={handleSaveCourseInfo} contained>Update Course Info</CButton>
      </Stack>
      <CButton onClick={() => setDeleteDialogOpen(true)} style={{ mt: 2 }} color='error' >Delete this Course</CButton>
      {/* delete dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this course?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CButton onClick={() => setDeleteDialogOpen(false)}>Cancel</CButton>
          <CButton loading={deleteMutation.isPending} onClick={handleDeleteCourse} color="error">Delete</CButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const CollapsibleSection = ({ title, isOpen, setIsOpen, children }) => (
  <Stack sx={{ borderRadius: '8px', border: '1px solid lightgray' }}>
    <CButton endIcon={<KeyboardArrowDownOutlined />} onClick={() => setIsOpen(!isOpen)}>
      {title}
    </CButton>
    <Collapse sx={{ m: isOpen ? 2 : '' }} in={isOpen}>
      {children}
    </Collapse>
  </Stack>
);

const InfoItem = ({ title, description, onDelete }) => (
  <Paper sx={{
    padding: '15px',
    mt: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <Box>
      <Typography variant="subtitle1">{title}</Typography>
      {description && (
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      )}
    </Box>
    <IconButton onClick={onDelete}>
      <Delete />
    </IconButton>
  </Paper>
);

export default EditInfo;