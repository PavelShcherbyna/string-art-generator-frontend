import React, { useState, useRef, useId, useEffect } from 'react';
import Voice from 'artyom.js';
import { useInterval } from 'usehooks-ts';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import PhotoInputCenter from '../PhotoInputCenter/PhotoInputCenter';
import GeneratorSettingsContainer from '../GeneratorSettingsContainer/GeneratorSettingsContainer';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import {
  createStringArt,
  drawLinesSVG
} from '../../stringGeneratorScript/stringArtMainScript';
import StepsModal from '../StepsModal/StepsModal';
import PickStepModal from '../StepsModal/PickStepModal';
import { changeDrawingStep, postDrawings } from '../../store/userData/slice';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowsNavigation from '../ArrowsNavigation';
import { removeSessionStorageItem } from '../../helpers/sessionStorage';
import { access_token } from '../../constants';
import { NoSleepContext } from '../../App';
import SnackbarPWAInstall from '../SnackbarPWAInstall';

const GeneratorMainBlock = () => {
  const [baseImageSrc, setBaseImageSrc] = useState('');
  const [generatorStep, setGeneratorStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [delay, setDelay] = useState(5000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resultsArr, setResultsArr] = useState([{}]); // { stepsArr, outputCanvasId, imgSrc }
  const [selectedRes, setSelectedRes] = useState({}); // { stepsArr, outputCanvasId, currIndex, imgSrc }
  const [stepsModalOpen, setStepsModalOpen] = useState(false);
  const [currentStepText, setCurrentStepText] = useState('');
  const [pickStepModalOpen, setPickStepModalOpen] = useState(false);
  const baseImgRef = useRef(null);
  const [lineCalcProgress, setLineCalcProgress] = useState(0);
  const [showPWAInstall, setShowPWAInstall] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const noSleep = React.useContext(NoSleepContext);

  const { drawings, justGenDrawId } = useSelector((state) => state.userData);
  const activeDrawing = drawings.find((el) => el.f_id === justGenDrawId);

  const generatedId = `${useId()}${new Date().getTime()}`;

  // const voice = new Voice();
  // voice.initialize({ lang: 'ru-RU', debug: false });

  const lineCountSettings = process.env.REACT_APP_LINES_SET || '3700';
  // const lineSetArr = lineCountSettings.split(',');
  //
  // const generalSettingsArr = lineSetArr.map((linesNum, index) => {
  //   return { lines: Number(linesNum), outputCanvasId: `canvasOutput${index}` };
  // });

  async function installAppHandler() {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;

    setShowPWAInstall(false);
  }

  useEffect(() => {
    if (!!window.deferredPrompt) {
      setShowPWAInstall(true);
    }
  }, []);

  useEffect(() => {
    if (justGenDrawId) {
      setGeneratorStep(2);
    }
  }, [justGenDrawId]);

  useEffect(() => {
    if (justGenDrawId && generatorStep === 2 && activeDrawing) {
      const steps = activeDrawing.steps;

      drawLinesSVG('resultImage', steps);
    }
  }, [justGenDrawId, activeDrawing, generatorStep]);

  useEffect(() => {
    if (
      justGenDrawId &&
      activeDrawing?.currentIndex > 0 &&
      location?.state?.from === 'saved'
    ) {
      onChangeStepClick();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (noSleep.isEnabled) {
        noSleep.disable();
      }
    };
  }, []);

  const onPlayClick = () => {
    // if (selectedRes.stepsArr) {
    //   setStepsModalOpen(true);
    //   setIsPlaying(true);
    //   showNextStep();
    // }
    navigate('/app/player');
  };

  function onChangeStepClick() {
    if (activeDrawing?.steps) {
      setPickStepModalOpen(true);
    }
  }

  const setStepIndex = (index) => {
    dispatch(changeDrawingStep({ ...activeDrawing, currentIndex: index }));

    setPickStepModalOpen(false);
    navigate('/app/player');
  };

  // const onStopClick = () => {
  //   setIsPlaying(false);
  //   // voice.shutUp()
  // };

  // const onFileSave = () => {
  //   if (selectedRes.stepsArr) {
  //     const fileTextArr = selectedRes.stepsArr
  //       .map((step) => Number(step) + 1)
  //       .join(', ');
  //
  //     const blob = new Blob([...fileTextArr], {
  //       type: 'text/plain;charset=utf-8'
  //     });
  //
  //     saveAs(blob, 'String art steps.txt');
  //   }
  // };

  const photoUploadedHandler = (e) => {
    if (e.target.files[0]) {
      setBaseImageSrc(URL.createObjectURL(e.target.files[0]));
      setGeneratorStep(1);
      setLineCalcProgress(0);
    }
  };

  const generateButtonHandler = async () => {
    await setGeneratorStep(2);
    setProcessing(true);
    setIsCalculating(true);
    setLineCalcProgress(0);
    // setSelectedRes({});

    // const maxLines = generalSettingsArr.reduce(
    //   (a, b) => Math.max(a, b.lines),
    //   -Infinity
    // );

    // const maxStepsArr = await createStringArt(
    //   baseImgRef.current,
    //   maxLines,
    //   setLineCalcProgress
    // );

    const stepsArr = await createStringArt(
      baseImgRef.current,
      Number(lineCountSettings),
      setLineCalcProgress
    );

    const resObj = { steps: stepsArr, currentIndex: 0, f_id: generatedId };

    setIsCalculating(false);

    dispatch(postDrawings({ drawings: [resObj] }));

    // const lineWidth = 0.03;
    // const immediatelyFinished = false;

    // drawLinesSync('canvasGray', stepsArr);
    drawLinesSVG('resultImage', stepsArr);

    setProcessing(false);
    noSleep.disable();
  };

  // const pickCanvasHandler = async (e) => {
  //   if (!processing) {
  //     const resObj = resultsArr.find((el) => el.outputCanvasId === e.target.id);
  //
  //     if (resObj) {
  //       const { stepsArr, outputCanvasId, imgSrc } = resObj;
  //
  //       // const lineWidth = 0.1;
  //       // const immediatelyFinished = true;
  //       //
  //       // await drawLines('canvasGray', stepsArr, immediatelyFinished);
  //
  //       const image = document.getElementById('resultImage');
  //       image.src = imgSrc;
  //
  //       setSelectedRes({ stepsArr, outputCanvasId, currIndex: 0 });
  //     }
  //   }
  // };

  // const onStepsModalClose = (e, reason) => {
  //   if (reason !== 'backdropClick') {
  //     setStepsModalOpen(false);
  //     // setSelectedRes({ ...selectedRes, currIndex: 0 });
  //     setCurrentStepText('');
  //     setIsPlaying(false);
  //
  //     voice.shutUp();
  //   }
  // };

  // function showNextStep() {
  //   let i = selectedRes.currIndex;
  //
  //   if (i < selectedRes.stepsArr?.length - 1) {
  //     // We add 1 to the point number as workaround, because the numbering on the
  //     // physical model does not start from 0, but from 1
  //     const nextPointNumber = Number(selectedRes.stepsArr[i + 1]) + 1;
  //
  //     const textToShow = `Шаг ${i + 1}. Следующая точка: ${nextPointNumber}`;
  //     const textToSpeak = `${nextPointNumber}`;
  //
  //     setCurrentStepText(textToShow);
  //
  //     voice.say(textToSpeak);
  //
  //     setSelectedRes({ ...selectedRes, currIndex: i + 1 });
  //   } else {
  //     voice.say('Конец!');
  //     setCurrentStepText('Конец!');
  //
  //     setIsPlaying(false);
  //   }
  // }
  //
  // useInterval(
  //   () => {
  //     showNextStep();
  //   },
  //   isPlaying ? delay : null
  // );

  function backToLoginPage() {
    removeSessionStorageItem(access_token);
    navigate('/');
  }

  function backToStep0() {
    setBaseImageSrc('');
    setGeneratorStep(0);
  }

  function backToStep1() {
    if (baseImageSrc) {
      setGeneratorStep(1);
    } else {
      setGeneratorStep(0);
    }
  }

  function pwaInstallHandleClose() {
    setShowPWAInstall(false);
    window.deferredPrompt = null;
  }

  return (
    <>
      {/*<img className="hidden" id="imageSrc" alt="Source" src={baseImageSrc} />*/}
      {!baseImageSrc && generatorStep === 0 && (
        <>
          <ArrowsNavigation backHandler={backToLoginPage} />
          <PhotoInputCenter onFileUploaded={photoUploadedHandler} />
        </>
      )}
      {baseImageSrc && generatorStep === 1 && (
        <>
          <ArrowsNavigation backHandler={backToStep0} />
          <GeneratorSettingsContainer
            imageSrc={baseImageSrc}
            setImageSrc={setBaseImageSrc}
            onFileUploaded={photoUploadedHandler}
            onGenerate={generateButtonHandler}
            baseImgRef={baseImgRef}
          />
        </>
      )}
      {generatorStep === 2 && (
        <>
          {!isCalculating && <ArrowsNavigation backHandler={backToStep1} />}
          <ResultsContainer
            onFileUploaded={photoUploadedHandler}
            onPlayClick={onPlayClick}
            onChangeStepClick={onChangeStepClick}
            // generalSettings={generalSettingsArr}
            // pickCanvasHandler={pickCanvasHandler}
            selectedRes={activeDrawing}
            processing={processing}
            // onFileSave={onFileSave}
            lineCalcProgress={lineCalcProgress}
            isCalculating={isCalculating}
            activeDrawingId={justGenDrawId}
          />
        </>
      )}
      {/*<StepsModal*/}
      {/*  open={stepsModalOpen}*/}
      {/*  handleClose={onStepsModalClose}*/}
      {/*  isPlaying={isPlaying}*/}
      {/*  onPlayClick={onPlayClick}*/}
      {/*  onStopClick={onStopClick}*/}
      {/*  currentStepText={currentStepText}*/}
      {/*/>*/}
      <PickStepModal
        open={pickStepModalOpen}
        onClose={() => {
          setPickStepModalOpen(false);
        }}
        selectedRes={activeDrawing}
        setStepIndex={setStepIndex}
      />
      <SnackbarPWAInstall
        open={showPWAInstall}
        handleClose={pwaInstallHandleClose}
        handleAction={installAppHandler}
      />
    </>
  );
};

export default GeneratorMainBlock;
