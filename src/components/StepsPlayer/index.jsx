import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/joy';
import Voice from 'artyom.js';
import { StepsPlayerWrapper } from './styles';
import {
  BackRewindBtn,
  DblBackRewindBtn,
  DblForwardRewindBtn,
  ForwardRewindBtn,
  PlayOrPauseBtn
} from './PlayerButtons';
import { BoldStep, NormalStep, TranslucentStep } from './PlayerCarouselSteps';
import { DelaySlider } from './DelaySlider';
import { useInterval } from 'usehooks-ts';
import { useSelector, useDispatch } from 'react-redux';
import { postDrawings } from '../../store/userData/slice';
import ArrowsNavigation from '../ArrowsNavigation';
import { useNavigate } from 'react-router-dom';
import { NoSleepContext } from '../../App';

export default function StepsPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [delay, setDelay] = useState(5000);
  const noSleep = React.useContext(NoSleepContext);
  const { drawings, justGenDrawId } = useSelector((state) => state.userData);

  const activeDrawing = drawings.find((el) => el.f_id === justGenDrawId) || {};
  const { steps, currentIndex } = activeDrawing;
  // We add 1 to the point number as workaround, because the numbering on the
  // physical model does not start from 0, but from 1
  const stepsToShow = steps.map((num) => num + 1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const voice = new Voice();
  voice.initialize({ lang: 'ru-RU', debug: false });

  function onSliderChange(event, newValue) {
    setDelay(newValue);
  }

  function showNextStep() {
    let i = currentIndex;

    if (i < steps.length - 1) {
      const nextPointNumber = Number(stepsToShow[i + 1]);

      // const textToShow = `Шаг ${i + 1}. Следующая точка: ${nextPointNumber}`;
      const textToSpeak = `${nextPointNumber}`;

      // setCurrentStepText(textToShow);

      voice.say(textToSpeak);

      // dispatch(
      //   changeDrawingStep({ ...activeDrawing, currentIndex: currentIndex + 1 })
      // );
      dispatch(
        postDrawings({
          drawings: [{ ...activeDrawing, currentIndex: currentIndex + 1 }]
        })
      );
    } else {
      voice.say('Конец!');
      // setCurrentStepText('Конец!');

      setIsPlaying(false);
    }
  }

  useInterval(
    () => {
      showNextStep();
    },
    isPlaying ? delay : null
  );

  function onPlayOrPauseClick() {
    if (isPlaying) {
      noSleep.disable();
      // voice.shutUp()
    } else {
      noSleep.enable();
      showNextStep();
    }
    setIsPlaying((prevState) => !prevState);
  }

  useEffect(() => {
    return () => {
      if (noSleep.isEnabled) {
        noSleep.disable();
      }
    };
  }, []);

  function onRewind(val) {
    // setIsPlaying(false);

    let newIndex = currentIndex + Number(val);
    newIndex = newIndex < 0 ? 0 : newIndex;

    // dispatch(changeDrawingStep({ ...activeDrawing, currentIndex: newIndex }));
    dispatch(
      postDrawings({ drawings: [{ ...activeDrawing, currentIndex: newIndex }] })
    );
    // showNextStep();
    // setIsPlaying(true);
  }

  // console.log('activeDrawing:', activeDrawing)
  // useEffect(() => {
  //   return function () {
  //     console.log('useEffect UNMOUNT TRIGGERED!!!')
  //     console.log('activeDrawing:', activeDrawing)
  //     console.log('currentIndex:', currentIndex)
  //     dispatch(postDrawings({ drawings: [activeDrawing] }));
  //   };
  // }, []);

  return (
    <>
      <ArrowsNavigation backHandler={() => navigate('/app')} />
      <StepsPlayerWrapper>
        <Grid
          container
          columns={{ xs: 1, sm: 1, md: 6, lg: 12, xl: 12 }}
          sx={{ justifyContent: 'space-evenly' }}
        >
          <Grid xs={0} sm={0} md={1} lg={2} xl={2} />
          <Grid xs={1} sm={1} md={4} lg={6} xl={4} className={'player'}>
            <div className={'steps-display-wrap'}>
              <TranslucentStep
                stepNum={currentIndex - 2}
                stepVal={stepsToShow[currentIndex - 2]}
              />
              <NormalStep
                stepNum={currentIndex - 1}
                stepVal={stepsToShow[currentIndex - 1]}
              />
              <BoldStep
                stepNum={currentIndex}
                stepVal={stepsToShow[currentIndex]}
              />
              <NormalStep
                stepNum={currentIndex + 1}
                stepVal={stepsToShow[currentIndex + 1]}
              />
              <TranslucentStep
                stepNum={currentIndex + 2}
                stepVal={stepsToShow[currentIndex + 2]}
              />
            </div>
            <div className={'ctrl-panel-wrap'}>
              <DblBackRewindBtn onButtonClick={() => onRewind(-10)} />
              <BackRewindBtn onButtonClick={() => onRewind(-1)} />
              <PlayOrPauseBtn
                isPlaying={isPlaying}
                onButtonClick={onPlayOrPauseClick}
              />
              <ForwardRewindBtn onButtonClick={() => onRewind(1)} />
              <DblForwardRewindBtn onButtonClick={() => onRewind(10)} />
            </div>
          </Grid>
          <Grid
            xs={1}
            sm={1}
            md={1}
            lg={2}
            xl={2}
            className={'interval-settings'}
          >
            <p>Паузы между цифрами</p>
            <DelaySlider delay={delay} onChange={onSliderChange} />
          </Grid>
        </Grid>
      </StepsPlayerWrapper>
    </>
  );
}
