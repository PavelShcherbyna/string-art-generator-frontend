import React, { useState, useRef, useId, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoInputCenter from '../PhotoInputCenter/PhotoInputCenter';
import GeneratorSettingsContainer from '../GeneratorSettingsContainer/GeneratorSettingsContainer';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import {
  createStringArt,
  drawLinesSVG
} from '../../stringGeneratorScript/stringArtMainScript';
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

  const lineCountSettings = process.env.REACT_APP_LINES_SET || '3700';

  async function installAppHandler() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    await promptEvent.userChoice;

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

    const stepsArr = await createStringArt(
      baseImgRef.current,
      Number(lineCountSettings),
      setLineCalcProgress
    );

    const resObj = { steps: stepsArr, currentIndex: 0, f_id: generatedId };

    setIsCalculating(false);

    dispatch(postDrawings({ drawings: [resObj] }));

    drawLinesSVG('resultImage', stepsArr);

    setProcessing(false);
    noSleep.disable();
  };

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
            selectedRes={activeDrawing}
            processing={processing}
            lineCalcProgress={lineCalcProgress}
            isCalculating={isCalculating}
            activeDrawingId={justGenDrawId}
          />
        </>
      )}
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
