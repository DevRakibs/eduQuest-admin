/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TextField, Button, Box, IconButton, Typography, Collapse, Paper, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CButton from '../../../common/CButton';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../../../utils/axiosReq';
import useAuth from '../../../hook/useAuth';

const AddContent = ({ course, onClose }) => {
  const [sections, setSections] = useState([{ section: '', content: [{ title: '', description: '', url: '' }] }]);
  const [editingSection, setEditingSection] = useState(null);
  const [editingContent, setEditingContent] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [openContent, setOpenContent] = useState(null);

  const { token } = useAuth()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (input) => axiosReq.put(`/course/update-content/${course._id}`, input, { headers: { Authorization: token } }),
    onSuccess: (res) => {
      toast.success(res.data);
      queryClient.invalidateQueries(['course']);
      onClose()
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  });

  const addSection = () => {
    if (sections[sections.length - 1].section.trim() === '') {
      toast.error('Please fill in the section for the current section before adding a new one.');
      return;
    }
    setSections([...sections, { section: '', content: [{ title: '', description: '', url: '' }] }]);
    setEditingSection(sections.length);
    setOpenSection(sections.length);
  };

  const addContent = (sectionIndex) => {
    const newSections = [...sections];
    const lastContent = newSections[sectionIndex].content[newSections[sectionIndex].content.length - 1];
    if (lastContent.title.trim() === '' || lastContent.url.trim() === '') {
      toast.error('Please fill in all fields for the current content before adding a new one.');
      return;
    }
    newSections[sectionIndex].content.push({ title: '', description: '', url: '' });
    setSections(newSections);
    setEditingContent({ section: sectionIndex, content: newSections[sectionIndex].content.length - 1 });
    setOpenSection(sectionIndex);
    setOpenContent(newSections[sectionIndex].content.length - 1);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
    if (editingSection === index) setEditingSection(null);
    if (openSection === index) setOpenSection(null);
  };

  const removeContent = (sectionIndex, contentIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].content = newSections[sectionIndex].content.filter((_, i) => i !== contentIndex);
    setSections(newSections);
    if (editingContent?.section === sectionIndex && editingContent?.content === contentIndex) {
      setEditingContent(null);
    }
    if (openContent === contentIndex) setOpenContent(null);
  };

  const handleInputChange = (sectionIndex, contentIndex, field, value) => {
    const newSections = [...sections];
    if (contentIndex === null) {
      newSections[sectionIndex].section = value;
    } else {
      newSections[sectionIndex].content[contentIndex][field] = value;
    }
    setSections(newSections);
  };

  const toggleSection = (index) => setOpenSection(openSection === index ? null : index);
  const toggleContent = (index) => setOpenContent(openContent === index ? null : index);
  const toggleEdit = (sectionIndex, contentIndex) => {
    if (contentIndex === null) {
      setEditingSection(editingSection === sectionIndex ? null : sectionIndex);
    } else {
      setEditingContent(editingContent?.section === sectionIndex && editingContent?.content === contentIndex
        ? null
        : { section: sectionIndex, content: contentIndex });
    }
  };

  const handleSave = () => {
    const hasEmptyFields = sections.some(section =>
      section.section.trim() === '' ||
      section.content.some(content =>
        content.title.trim() === '' ||
        content.url.trim() === ''
      )
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields before saving.');
      return;
    }

    mutation.mutate({ content: sections })
  };

  return (
    <Box maxWidth='md'>
      <Typography variant='h6'>Course Content</Typography>
      <Stack direction='row' justifyContent='space-between' mt={1} mb={3}>
        <Box />
        <CButton loading={mutation.isPending} contained onClick={handleSave}>Save Course Content</CButton>
      </Stack>
      {sections.map((section, sectionIndex) => (
        <Paper key={sectionIndex} elevation={3} sx={{ mb: 2, p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" onClick={() => toggleSection(sectionIndex)} sx={{ cursor: 'pointer', flexGrow: 1 }}>
              {section.section || 'Untitled Section'}
              {openSection === sectionIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Typography>
            <IconButton disabled={sections.length === 1} color="error" onClick={() => removeSection(sectionIndex)}><DeleteIcon /></IconButton>
          </Box>
          <Collapse in={openSection === sectionIndex}>
            {editingSection === sectionIndex ? (
              <Box mt={2}>
                <TextField
                  label="Section"
                  value={section.section}
                  onChange={(e) => handleInputChange(sectionIndex, null, 'section', e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <IconButton color="primary" onClick={() => toggleEdit(sectionIndex, null)}><SaveIcon /></IconButton>
              </Box>
            ) : (
              <Box mt={2}>
                <Typography variant="body1"><strong>Section:</strong> {section.section || 'No Section'}</Typography>
                <IconButton color="primary" onClick={() => toggleEdit(sectionIndex, null)}><EditIcon /></IconButton>
              </Box>
            )}

            {section.content.map((content, contentIndex) => (
              <Paper key={contentIndex} elevation={2} sx={{ mt: 2, p: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body1" onClick={() => toggleContent(contentIndex)} sx={{ cursor: 'pointer', flexGrow: 1 }}>
                    {content.title || 'Untitled Content'}
                    {openContent === contentIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Typography>
                  <IconButton disabled={section.content.length === 1} color="error" onClick={() => removeContent(sectionIndex, contentIndex)}><DeleteIcon /></IconButton>
                </Box>
                <Collapse in={openContent === contentIndex}>
                  {editingContent?.section === sectionIndex && editingContent?.content === contentIndex ? (
                    <Box mt={2}>
                      <TextField
                        label="Title"
                        value={content.title}
                        onChange={(e) => handleInputChange(sectionIndex, contentIndex, 'title', e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Description"
                        value={content.description}
                        onChange={(e) => handleInputChange(sectionIndex, contentIndex, 'description', e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Video URL"
                        value={content.url}
                        onChange={(e) => handleInputChange(sectionIndex, contentIndex, 'url', e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <IconButton color="primary" onClick={() => toggleEdit(sectionIndex, contentIndex)}><SaveIcon /></IconButton>
                    </Box>
                  ) : (
                    <Box mt={2}>
                      <Typography variant="body1"><strong>Title:</strong> {content.title || 'No Title'}</Typography>
                      <Typography variant="body1"><strong>Description:</strong> {content.description || 'No Description'}</Typography>
                      <Typography variant="body1"><strong>Video URL:</strong> {content.url || 'No Video URL'}</Typography>
                      <IconButton color="primary" onClick={() => toggleEdit(sectionIndex, contentIndex)}><EditIcon /></IconButton>
                    </Box>
                  )}
                </Collapse>
              </Paper>
            ))}
            <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={() => addContent(sectionIndex)}>
              Add Content
            </Button>
          </Collapse>
        </Paper>
      ))}

      <Button variant="contained" startIcon={<AddIcon />} onClick={addSection}>
        Add Section
      </Button>
    </Box>
  );
};

export default AddContent;
