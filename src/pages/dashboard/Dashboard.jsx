import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const Dashboard = () => {
  return (
    <Box
      maxWidth='xl'
      sx={{
        backgroundColor: '#4C47E1',
        color: '#fff',
        borderRadius: 2,
        px: 3, py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 300, opacity: 0.8 }}>
          September 19, 2024
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mt: 1 }}>
          Welcome Back, <span style={{ color: '#FFC107' }}>Rakibul Alam!</span>
        </Typography>
        <Typography sx={{ mt: 1, fontWeight: 300, opacity: 0.8 }}>
          See what's happening with your courses and students.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          {[
            { label: 'COURSES', value: 23, color: '#4a57e2' },
            { label: 'CERTIFICATES', value: 9, color: '#e53935' },
            { label: 'SCORE', value: 4.8, color: '#388e3c' },
            { label: 'HRS LEARNED', value: 822, color: '#0288d1' },
          ].map((stat) => (
            <Grid item xs={6} sm={3} key={stat.label}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff', color: '#000' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {stat.label}
                </Typography>
                <Typography variant="h5" component="p" sx={{ mt: 1, color: stat.color }}>
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', lg: 'block' },
          ml: 3,
          alignSelf: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 200,
            // height: 200,
          }}
        >
          <img src="/welcome.png" alt="" />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard