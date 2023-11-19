import React from 'react';
import { ResultsContainerWrapper, StepsStartContainer } from './styles';
import LoadAnotherInput from '../LoadAnotherInput/LoadAnotherInput';
import { ButtonGray, ButtonWithBorder, SliderWrapper } from '../reusableStyles';
import { Box, Slider, Stack } from '@mui/material';
import IconPlay from '../../assets/IconPlay';
import IconSave from '../../assets/IconSave';
import IconShare from '../../assets/IconShare';
import IconFileDownload from '../../assets/IconFileDownload';
import cn from 'classnames';
import { LinearProgressWithLabel, Progress } from '../Progress/Progress';

const ResultsContainer = (props) => {
  const {
    onFileUploaded,
    delay,
    setDelay,
    onPlayClick,
    onChangeStepClick,
    generalSettings,
    pickCanvasHandler,
    selectedRes,
    processing,
    onFileSave,
    lineCalcProgress,
    isCalculating
  } = props;

  function onSliderChange(event, newValue) {
    setDelay(newValue);
  }

  return (
    <ResultsContainerWrapper>
      <div className="images-block">
        <div className="big-img-wrapper">
          <canvas
            id="canvasGray"
            className={cn('chosen-result', {
              invisible: selectedRes.outputCanvasId
            })}
            width="455"
            height="455"
          />
          <img
            id="resultImage"
            alt={''}
            src={''}
            className={cn('chosen-result', {
              invisible: !selectedRes.outputCanvasId
            })}
          />
          {isCalculating && (
            <LinearProgressWithLabel value={lineCalcProgress} />
          )}
        </div>

        <div
          className={cn('result-images-wrapper', {
            // hidden: isCalculating,
            // 'result-images-wrapper': !isCalculating
          })}
        >
          {/*{generalSettings.map(({ outputCanvasId, lines }, index) => {*/}
          {/*  return (*/}
          {/*    <div className="canvas-output-wrap" key={index}>*/}
          {/*      <canvas*/}
          {/*        className={'invisible'}*/}
          {/*        id={`${outputCanvasId}-hd`}*/}
          {/*        width="2000"*/}
          {/*        height="2000"*/}
          {/*      />*/}
          {/*      <canvas*/}
          {/*        className={cn('canvas-output', {*/}
          {/*          clickable: !processing,*/}
          {/*          selected: selectedRes.outputCanvasId === outputCanvasId*/}
          {/*        })}*/}
          {/*        id={outputCanvasId}*/}
          {/*        onClick={(e) => pickCanvasHandler(e)}*/}
          {/*        width="400"*/}
          {/*        height="400"*/}
          {/*      />*/}
          {/*      {isCalculating ? null : <span>{lines}</span>}*/}
          {/*    </div>*/}
          {/*  );*/}
          {/*})}*/}
        </div>
        {!processing && <LoadAnotherInput onFileUploaded={onFileUploaded} />}
      </div>
      {processing ? null : (
        <div className="controls-block">
          <h3>Настройки</h3>
          <div>
            <p>Паузы между цифрами</p>
            <SliderWrapper>
              <Box sx={{ minWidth: 226 }}>
                <Stack spacing={2} direction="row" alignItems="center">
                  <Slider
                    className="label-bottom"
                    valueLabelDisplay="on"
                    valueLabelFormat={(v) => `${v / 1000}сек`}
                    size="small"
                    aria-label="Volume"
                    value={delay}
                    onChange={onSliderChange}
                    step={500}
                    min={4500}
                    // marks
                    max={10000}
                  />
                </Stack>
              </Box>
            </SliderWrapper>
          </div>
          <div className="start-btn-wrap">
            <ButtonWithBorder onClick={onPlayClick}>
              <IconPlay />
              <span>Начать</span>
            </ButtonWithBorder>

            {selectedRes.stepsArr ? (
              <StepsStartContainer>
                <span>Начало с шага {selectedRes.currIndex + 1}</span>
                <button
                  onClick={onChangeStepClick}
                  className={'change-step-btn'}
                >
                  <span>Изменить</span>
                </button>
              </StepsStartContainer>
            ) : (
              <span className="warning-span">Выберите рисунок</span>
            )}
          </div>

          <div className="bottom-btn-wrap">
            <div className="bottom-btn-group">
              <ButtonGray>
                <IconSave />
                <span>Сохранить</span>
              </ButtonGray>
              <ButtonGray>
                <IconShare />
                <span>Поделиться</span>
              </ButtonGray>
            </div>
            <div className="bottom-btn-group">
              <ButtonGray onClick={onFileSave}>
                <IconFileDownload />
                <span>Скачать инструкцию</span>
              </ButtonGray>
            </div>
          </div>
        </div>
      )}
    </ResultsContainerWrapper>
  );
};

export default ResultsContainer;
