import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import AvatarEditor from 'react-avatar-editor';
import { GenSettingContainerWrapper } from './styles';
import { SliderWrapper, ButtonWithBorder } from '../reusableStyles';
import { Box, Slider, Stack } from '@mui/material';
import LoadAnotherInput from '../LoadAnotherInput/LoadAnotherInput';
import minusSVG from '../../assets/icon_minus.svg';
import plusSVG from '../../assets/icon_plus.svg';
import lowBrightSVG from '../../assets/low_bright.svg';
import highBrightSVG from '../../assets/high_bright.svg';
import lowContrastSVG from '../../assets/low_contrast.svg';
import highContrastSVG from '../../assets/high_contrast.svg';

const GeneratorSettingsContainer = ({
  imageSrc,
  setImageSrc,
  onFileUploaded,
  onGenerate,
  baseImgRef
}) => {
  // const [imgForm, setImgForm] = useState('circle');
  const [imgScale, setImgScale] = useState(1.1);
  // const [imgRotate, setImgRotate] = useState(0);
  const [bright, setBright] = useState(0);
  const [contrast, setContrast] = useState(0);

  const imgEditorStyle = {
    width: 'clamp(240px, 90vw, 455px)',
    height: 'clamp(240px, 90vw, 455px)',
    touchAction: 'auto'
  };

  useEffect(() => {
    setImgScale(1.1);
    // setImgRotate(0);
  }, [imageSrc]);

  let editor;

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const cropImage = () => {
    if (setEditorRef) {
      baseImgRef.current = editor.getImage();
      // const croppedImgURL = canvasScaled.toDataURL();

      // const croppedImg = new Image();
      // croppedImg.src = canvasScaled.toDataURL();
      // croppedImg.width = canvasScaled.width;
      // croppedImg.height = canvasScaled.height;

      // await setImageSrc(croppedImgURL);
    }
  };

  return (
    <GenSettingContainerWrapper>
      <div className="image-block">
        <div className={cn('image-wrapper')}>
          <AvatarEditor
            style={imgEditorStyle}
            ref={setEditorRef}
            image={imageSrc}
            width={455}
            height={455}
            border={0}
            color={[0, 0, 0, 0.5]}
            borderRadius={240}
            scale={imgScale}
            // rotate={imgRotate}
          />
        </div>
        <div className="zoom-wrap">
          <SliderWrapper>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <img src={minusSVG} alt="minus" />
                <Slider
                  size="small"
                  value={imgScale}
                  onChange={(e) => setImgScale(e.target.value)}
                  step={0.1}
                  min={1}
                  max={5}
                />
                <img src={plusSVG} alt="plus" />
              </Stack>
            </Box>
          </SliderWrapper>
        </div>
        <LoadAnotherInput onFileUploaded={onFileUploaded} />
      </div>
      <div className="settings-block">
        <h3>Настройки</h3>
        {/*<div className="form-picker-wrap">*/}
        {/*  <p>Форма</p>*/}
        {/*  <div className="form-buttons-wrap">*/}
        {/*    <button*/}
        {/*      className={cn('square-form', { disabled: imgForm !== 'square' })}*/}
        {/*      onClick={() => setImgForm('square')}*/}
        {/*      disabled={true}*/}
        {/*    />*/}
        {/*    <button*/}
        {/*      className={cn('circle-form', { disabled: imgForm !== 'circle' })}*/}
        {/*      onClick={() => setImgForm('circle')}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="rotate-wrap">*/}
        {/*  <p>Вращение</p>*/}
        {/*  <SliderWrapper>*/}
        {/*    <Box sx={{ width: 282 }}>*/}
        {/*      <Stack spacing={2} direction="row" alignItems="center">*/}
        {/*        <Slider*/}
        {/*          size="small"*/}
        {/*          value={imgRotate}*/}
        {/*          onChange={(e) => setImgRotate(e.target.value)}*/}
        {/*          step={5}*/}
        {/*          min={-180}*/}
        {/*          max={180}*/}
        {/*        />*/}
        {/*      </Stack>*/}
        {/*    </Box>*/}
        {/*  </SliderWrapper>*/}
        {/*</div>*/}
        <div className="slider-wrapper">
          <p>Яркость</p>
          <SliderWrapper>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <img src={lowBrightSVG} alt="dark sun" />
                <Slider
                  size="small"
                  aria-label="Volume"
                  value={bright}
                  onChange={(e) => setBright(e.target.value)}
                />
                <img src={highBrightSVG} alt="bright sun" />
              </Stack>
            </Box>
          </SliderWrapper>
        </div>
        <div className="slider-wrapper">
          <p>Контрастность</p>
          <SliderWrapper>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <img src={lowContrastSVG} alt="low contrast" />
                <Slider
                  size="small"
                  aria-label="Volume"
                  value={contrast}
                  onChange={(e) => setContrast(e.target.value)}
                />
                <img src={highContrastSVG} alt="high contrast" />
              </Stack>
            </Box>
          </SliderWrapper>
        </div>
        <ButtonWithBorder
          onClick={() => {
            cropImage();
            onGenerate();
          }}
        >
          <span>Генерировать</span>
        </ButtonWithBorder>
      </div>
    </GenSettingContainerWrapper>
  );
};

export default GeneratorSettingsContainer;
