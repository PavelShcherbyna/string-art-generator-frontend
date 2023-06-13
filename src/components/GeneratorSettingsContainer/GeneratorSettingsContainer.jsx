import React, { useState } from 'react';
import cn from 'classnames';
import { GenSettingContainerWrapper } from './styles';
import { SliderWrapper, ButtonWithBorder } from '../reusableStyles';
import { Box, Slider, Stack } from '@mui/material';
import IconLowBright from '../../assets/IconLowBright';
import IconHighBright from '../../assets/IconHighBright';
import IconLowContrast from '../../assets/IconLowContrast';
import IconHighContrast from '../../assets/IconHighContrast';
import LoadAnotherInput from '../LoadAnotherInput/LoadAnotherInput';

const GeneratorSettingsContainer = ({
  imageSrc,
  onFileUploaded,
  onGenerate
}) => {
  const [imgForm, setImgForm] = useState('circle');
  const [bright, setBright] = useState(0);
  const [contrast, setContrast] = useState(0);

  return (
    <GenSettingContainerWrapper>
      <div className="image-block">
        <div
          className={cn('image-wrapper', { imgCircled: imgForm === 'circle' })}
        >
          <img
            className="base-image"
            id="imageSrc"
            alt="Source"
            src={imageSrc}
          />
        </div>

        <LoadAnotherInput onFileUploaded={onFileUploaded} />
      </div>
      <div className="settings-block">
        <h3>Настройки</h3>
        <div className="form-picker-wrap">
          <p>Форма</p>
          <div className="form-buttons-wrap">
            <button
              className={cn('square-form', { disabled: imgForm !== 'square' })}
              onClick={() => setImgForm('square')}
              disabled={true}
            />
            <button
              className={cn('circle-form', { disabled: imgForm !== 'circle' })}
              onClick={() => setImgForm('circle')}
            />
          </div>
        </div>
        {/*<div className="bright-wrap">*/}
        {/*  <p>Яркость</p>*/}
        {/*  <SliderWrapper>*/}
        {/*    <Box sx={{ width: 282 }}>*/}
        {/*      <Stack spacing={2} direction="row" alignItems="center">*/}
        {/*        <IconLowBright />*/}
        {/*        <Slider*/}
        {/*          size="small"*/}
        {/*          aria-label="Volume"*/}
        {/*          value={bright}*/}
        {/*          onChange={(e) => setBright(e.target.value)}*/}
        {/*        />*/}
        {/*        <IconHighBright />*/}
        {/*      </Stack>*/}
        {/*    </Box>*/}
        {/*  </SliderWrapper>*/}
        {/*</div>*/}
        {/*<div className="contrast-wrap">*/}
        {/*  <p>Контрастность</p>*/}
        {/*  <SliderWrapper>*/}
        {/*    <Box sx={{ width: 282 }}>*/}
        {/*      <Stack spacing={2} direction="row" alignItems="center">*/}
        {/*        <IconLowContrast />*/}
        {/*        <Slider*/}
        {/*          size="small"*/}
        {/*          aria-label="Volume"*/}
        {/*          value={contrast}*/}
        {/*          onChange={(e) => setContrast(e.target.value)}*/}
        {/*        />*/}
        {/*        <IconHighContrast />*/}
        {/*      </Stack>*/}
        {/*    </Box>*/}
        {/*  </SliderWrapper>*/}
        {/*</div>*/}
        <ButtonWithBorder onClick={onGenerate}>
          <span>ГЕНЕРИРОВАТЬ</span>
        </ButtonWithBorder>
      </div>
    </GenSettingContainerWrapper>
  );
};

export default GeneratorSettingsContainer;
