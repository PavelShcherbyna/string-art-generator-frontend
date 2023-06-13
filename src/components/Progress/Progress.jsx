import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  };

  return (
    <Box sx={boxStyle}>
      <CircularProgress color="inherit" />
    </Box>
  );
}
