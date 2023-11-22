import React from 'react';
import { SliderWrapper } from '../reusableStyles';
import { Box, Slider } from '@mui/material';

export const DelaySlider = ({ delay, onChange }) => {
  return (
    <SliderWrapper>
      <Box sx={{ width: '100%' }}>
        {/*<Stack spacing={2} direction="row" alignItems="center">*/}
        <Slider
          className="label-bottom"
          valueLabelDisplay="on"
          valueLabelFormat={(v) => `${v / 1000}сек`}
          size="small"
          aria-label="Volume"
          value={delay}
          onChange={onChange}
          step={500}
          min={4500}
          // marks
          max={10000}
        />
        {/*</Stack>*/}
      </Box>
    </SliderWrapper>
  );
};
