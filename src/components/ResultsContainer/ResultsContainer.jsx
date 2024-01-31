import React from 'react';
import { ResultsContainerWrapper, StepsStartContainer } from './styles';
import LoadAnotherInput from '../LoadAnotherInput/LoadAnotherInput';
import { ButtonWithBorder } from '../reusableStyles';
import IconPlay from '../../assets/IconPlay';
import cn from 'classnames';
import { LinearProgressWithLabel } from '../Progress/Progress';
import { FormattedMessage } from 'react-intl';

const ResultsContainer = (props) => {
  const {
    onFileUploaded,
    onPlayClick,
    onChangeStepClick,
    selectedRes,
    processing,
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
        {!processing && <LoadAnotherInput onFileUploaded={onFileUploaded} />}
      </div>
      {processing ? null : (
        <div className="controls-block">
          <ButtonWithBorder className={'min-width-set'} onClick={onPlayClick}>
            <IconPlay />
            <span>
              <FormattedMessage
                id="app.result.start.btn"
                defaultMessage="Start"
              />
            </span>
          </ButtonWithBorder>

          {activeDrawingId && (
            <StepsStartContainer>
              <span>
                <FormattedMessage
                  id="app.result.start.step"
                  defaultMessage="Start from step {step}"
                  values={{ step: selectedRes?.currentIndex + 1 }}
                />
              </span>
              <button onClick={onChangeStepClick} className={'change-step-btn'}>
                <span>
                  <FormattedMessage
                    id="app.result.start.change"
                    defaultMessage="Change"
                  />
                </span>
              </button>
            </StepsStartContainer>
          )}
        </div>
      )}
    </ResultsContainerWrapper>
  );
};

export default ResultsContainer;
