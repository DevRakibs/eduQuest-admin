import React from 'react';
import { Card, CardContent, Typography, Avatar, Chip, Box, IconButton } from '@mui/material';
import { BorderColorOutlined, EditOutlined } from '@mui/icons-material';

const CategoryCard = () => {


  return (
    <Card sx={{ maxWidth: 345, width: '100%', borderRadius: 2, p: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Avatar sx={{ bgcolor: '#8e6ac8', width: 40, height: 40, mr: 2 }}>GD</Avatar>
          <Box flex="1">
            <Typography variant="h6" fontWeight="bold">
              Graphics Design
            </Typography>
            <Typography variant="body2" color="textSecondary">
              4 SubCategories
            </Typography>
          </Box>
          <IconButton>
            <BorderColorOutlined />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary" mt={2}>
          Website Design & Develop the website with web applications
        </Typography>
        <Box mt={2} display="flex" gap={1} flexWrap="wrap">
          <Chip label="Photoshop" sx={{ bgcolor: '#e1f5fe', color: '#0288d1' }} />
          <Chip label="Adobe Illustrator" sx={{ bgcolor: '#ffebee', color: '#e53935' }} />
          <Chip label="Logo Design" sx={{ bgcolor: '#e3f2fd', color: '#1e88e5' }} />
          <Chip label="Drawing" sx={{ bgcolor: '#fff3e0', color: '#fb8c00' }} />
          <Chip label="Figma" sx={{ bgcolor: '#eceff1', color: '#37474f' }} />
        </Box>
      </CardContent>
    </Card >
  );
};

export default CategoryCard;
