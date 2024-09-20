import React, { useState, useCallback } from 'react';
import { TextField, Button, Box, IconButton, Typography, Collapse, Paper, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CButton from '../../../common/CButton';

const ContentInput = () => {
  const [sections, setSections] = useState([
    { section: '', content: [{ title: '', description: '', url: '' }] },
  ]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the currently editing section and content index
  const [openSectionIndex, setOpenSectionIndex] = useState(null); // Track the currently open section
  const [openContentIndex, setOpenContentIndex] = useState(null); // Track the currently open content within a section

  // Function to handle adding a new section
  const handleAddSection = () => {
    setSections([...sections, { section: '', content: [{ title: '', description: '', url: '' }] }]);
    setEditingIndex({ sectionIndex: sections.length, contentIndex: null });
    setOpenSectionIndex(sections.length); // Automatically open the new section
  };

  // Function to handle adding new content within a section
  const handleAddContent = (sectionIndex) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === sectionIndex
          ? {
            ...section,
            content: [...section.content, { title: '', description: '', url: '' }],
          }
          : section
      )
    );
    setEditingIndex({ sectionIndex, contentIndex: sections[sectionIndex].content.length }); // Automatically open the new content for editing
    setOpenSectionIndex(sectionIndex); // Open the section where the content is added
    setOpenContentIndex(sections[sectionIndex].content.length);
  };

  // Function to handle removing a section
  const handleRemoveSection = useCallback((sectionIndex) => {
    setSections((prevSections) => prevSections.filter((_, i) => i !== sectionIndex));
    if (editingIndex?.sectionIndex === sectionIndex) setEditingIndex(null);
    if (openSectionIndex === sectionIndex) setOpenSectionIndex(null);
  }, [editingIndex, openSectionIndex]);

  // Function to handle removing content within a section
  const handleRemoveContent = useCallback((sectionIndex, contentIndex) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === sectionIndex
          ? {
            ...section,
            content: section.content.filter((_, ci) => ci !== contentIndex),
          }
          : section
      )
    );
    if (editingIndex?.sectionIndex === sectionIndex && editingIndex?.contentIndex === contentIndex) {
      setEditingIndex(null);
    }
    if (openContentIndex === contentIndex) setOpenContentIndex(null);
  }, [editingIndex, openContentIndex]);

  // Function to handle updating the section or content inputs
  const handleInputChange = useCallback((sectionIndex, contentIndex, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === sectionIndex
          ? {
            ...section,
            ...(contentIndex === null
              ? { section: value }
              : {
                content: section.content.map((content, ci) =>
                  ci === contentIndex ? { ...content, [field]: value } : content
                ),
              }),
          }
          : section
      )
    );
  }, []);

  // Function to toggle the collapse state for a section
  const toggleSectionCollapse = useCallback((sectionIndex) => {
    setOpenSectionIndex((prevIndex) => (prevIndex === sectionIndex ? null : sectionIndex));
  }, []);

  // Function to toggle the collapse state for content within a section
  const toggleContentCollapse = useCallback((contentIndex) => {
    setOpenContentIndex((prevIndex) => (prevIndex === contentIndex ? null : contentIndex));
  }, []);

  // Function to toggle edit mode for a specific content
  const toggleEditMode = useCallback((sectionIndex, contentIndex) => {
    setEditingIndex((prev) =>
      prev && prev.sectionIndex === sectionIndex && prev.contentIndex === contentIndex
        ? null
        : { sectionIndex, contentIndex }
    );
  }, []);
  console.log(sections)
  return (
    <Box maxWidth='md'>
      <Typography variant='h6'>Course Content</Typography>
      <Stack direction='row' justifyContent='space-between' mt={1} mb={3}>
        <Box />
        <CButton contained>Save Course Content</CButton>
      </Stack>
      {sections.map((section, sectionIndex) => (
        <Paper key={sectionIndex} elevation={3} sx={{ mb: 2, p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography
              variant="h6"
              onClick={() => toggleSectionCollapse(sectionIndex)}
              sx={{ cursor: 'pointer', flexGrow: 1 }}
            >
              {section.section || 'Untitled Section'}
              {openSectionIndex === sectionIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Typography>
            <IconButton color="error" onClick={() => handleRemoveSection(sectionIndex)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Collapse in={openSectionIndex === sectionIndex}>
            {/* Section Name Input */}
            {editingIndex?.sectionIndex === sectionIndex && editingIndex?.contentIndex === null ? (
              <Box mt={2}>
                <TextField
                  label="Section Name"
                  value={section.section}
                  onChange={(e) => handleInputChange(sectionIndex, null, 'section', e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <IconButton color="primary" onClick={() => toggleEditMode(sectionIndex, null)}>
                  <SaveIcon />
                </IconButton>
              </Box>
            ) : (
              <Box mt={2}>
                <Typography variant="body1">
                  <strong>Section:</strong> {section.section || 'No Section Name'}
                </Typography>
                <IconButton color="primary" onClick={() => toggleEditMode(sectionIndex, null)}>
                  <EditIcon />
                </IconButton>
              </Box>
            )}

            {section.content.map((content, contentIndex) => (
              <Paper key={contentIndex} elevation={2} sx={{ mt: 2, p: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography
                    variant="body1"
                    onClick={() => toggleContentCollapse(contentIndex)}
                    sx={{ cursor: 'pointer', flexGrow: 1 }}
                  >
                    {content.title || 'Untitled Content'}
                    {openContentIndex === contentIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Typography>
                  <IconButton color="error" onClick={() => handleRemoveContent(sectionIndex, contentIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Collapse in={openContentIndex === contentIndex}>
                  {editingIndex?.sectionIndex === sectionIndex && editingIndex?.contentIndex === contentIndex ? (
                    <Box mt={2}>
                      <TextField
                        label="Title"
                        value={content.title}
                        onChange={(e) =>
                          handleInputChange(sectionIndex, contentIndex, 'title', e.target.value)
                        }
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Description"
                        value={content.description}
                        onChange={(e) =>
                          handleInputChange(sectionIndex, contentIndex, 'description', e.target.value)
                        }
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
                      <IconButton color="primary" onClick={() => toggleEditMode(sectionIndex, contentIndex)}>
                        <SaveIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box mt={2}>
                      <Typography variant="body1">
                        <strong>Title:</strong> {content.title || 'No Title'}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Description:</strong> {content.description || 'No Description'}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Video URL:</strong> {content.url || 'No Video URL'}
                      </Typography>
                      <IconButton color="primary" onClick={() => toggleEditMode(sectionIndex, contentIndex)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )}
                </Collapse>
              </Paper>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
              onClick={() => handleAddContent(sectionIndex)}
            >
              Add Content
            </Button>
          </Collapse>
        </Paper>
      ))}

      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddSection}>
        Add Section
      </Button>
    </Box>
  );
};

export default ContentInput;
