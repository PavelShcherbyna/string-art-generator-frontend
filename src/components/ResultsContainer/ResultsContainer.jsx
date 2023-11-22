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
    onPlayClick,
    onChangeStepClick,
    generalSettings,
    pickCanvasHandler,
    selectedRes,
    processing,
    onFileSave,
    lineCalcProgress,
    isCalculating,
    activeDrawingId
  } = props;

  return (
    <ResultsContainerWrapper>
      <div className="images-block">
        <div className="big-img-wrapper">
          <canvas
            id="canvasGray"
            className={cn('chosen-result', {
              invisible: activeDrawingId && !isCalculating
            })}
            width="455"
            height="455"
          />
          <svg
            id="resultImage"
            className={cn('chosen-result', {
              invisible: !activeDrawingId || isCalculating
            })}
          />
          {isCalculating && (
            <LinearProgressWithLabel value={lineCalcProgress} />
          )}
        </div>

        {/*<div*/}
        {/*  className={cn('result-images-wrapper', {*/}
        {/*    // hidden: isCalculating,*/}
        {/*    // 'result-images-wrapper': !isCalculating*/}
        {/*  })}*/}
        {/*>*/}
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
        {/*</div>*/}
        {!processing && <LoadAnotherInput onFileUploaded={onFileUploaded} />}
      </div>
      {processing ? null : (
        <div className="controls-block">
          {/*<div className="start-btn-wrap">*/}
          <ButtonWithBorder className={'min-width-set'} onClick={onPlayClick}>
            <IconPlay />
            <span>Начать</span>
          </ButtonWithBorder>

          {activeDrawingId && (
            <StepsStartContainer>
              <span>Начало с шага {selectedRes?.currentIndex + 1}</span>
              <button onClick={onChangeStepClick} className={'change-step-btn'}>
                <span>Изменить</span>
              </button>
            </StepsStartContainer>
          )}
          {/*</div>*/}

          {/*<div className="bottom-btn-wrap">*/}
          {/*  <div className="bottom-btn-group">*/}
          {/*    <ButtonGray>*/}
          {/*      <IconSave />*/}
          {/*      <span>Сохранить</span>*/}
          {/*    </ButtonGray>*/}
          {/*    <ButtonGray>*/}
          {/*      <IconShare />*/}
          {/*      <span>Поделиться</span>*/}
          {/*    </ButtonGray>*/}
          {/*  </div>*/}
          {/*  <div className="bottom-btn-group">*/}
          {/*    <ButtonGray onClick={onFileSave}>*/}
          {/*      <IconFileDownload />*/}
          {/*      <span>Скачать инструкцию</span>*/}
          {/*    </ButtonGray>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      )}
    </ResultsContainerWrapper>
  );
};

export default ResultsContainer;
