import * as React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, LinearProgress, Typography } from '@mui/material';

export function Progress() {
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

export function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', marginRight: '8px', marginLeft: '43px' }}>
        <LinearProgress variant="determinate" {...props} color="inherit" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
