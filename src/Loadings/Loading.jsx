import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

function Loading({ message = "Loading..." }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <CircularProgress />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}

export default Loading;