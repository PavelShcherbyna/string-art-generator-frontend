import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import AvatarEditor from 'react-avatar-editor';
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
  setImageSrc,
  onFileUploaded,
  onGenerate
}) => {
  const [imgForm, setImgForm] = useState('circle');
  const [imgScale, setImgScale] = useState(1.1);
  const [imgRotate, setImgRotate] = useState(0);
  // const [bright, setBright] = useState(0);
  // const [contrast, setContrast] = useState(0);

  useEffect(() => {
    setImgScale(1.1);
    setImgRotate(0);
  }, [imageSrc]);

  let editor;

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const cropImage = async () => {
    if (setEditorRef) {
      const canvasScaled = editor.getImage();
      const croppedImg = canvasScaled.toDataURL();

      await setImageSrc(croppedImg);
    }
  };

  return (
    <GenSettingContainerWrapper>
      <div className="image-block">
        <div className={cn('image-wrapper')}>
          <AvatarEditor
            ref={setEditorRef}
            image={imageSrc}
            width={439}
            height={439}
            border={20}
            color={[0, 0, 0, 0.5]}
            borderRadius={240}
            scale={imgScale}
            rotate={imgRotate}
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
        <div className="zoom-wrap">
          <p>Масштаб</p>
          <SliderWrapper>
            <Box sx={{ width: 282 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Slider
                  size="small"
                  value={imgScale}
                  onChange={(e) => setImgScale(e.target.value)}
                  step={0.1}
                  min={1}
                  max={5}
                />
              </Stack>
            </Box>
          </SliderWrapper>
        </div>
        <div className="rotate-wrap">
          <p>Вращение</p>
          <SliderWrapper>
            <Box sx={{ width: 282 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Slider
                  size="small"
                  value={imgRotate}
                  onChange={(e) => setImgRotate(e.target.value)}
                  step={5}
                  min={-180}
                  max={180}
                />
              </Stack>
            </Box>
          </SliderWrapper>
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
        <ButtonWithBorder
          onClick={async () => {
            await cropImage();
            onGenerate();
          }}
        >
          <span>ГЕНЕРИРОВАТЬ</span>
        </ButtonWithBorder>
      </div>
    </GenSettingContainerWrapper>
  );
};

export default GeneratorSettingsContainer;
