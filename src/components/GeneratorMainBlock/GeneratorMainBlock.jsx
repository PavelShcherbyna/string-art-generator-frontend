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
  drawLines,
  drawLinesSync
} from '../../stringGeneratorScript/stringArtMainScript';
import StepsModal from '../StepsModal/StepsModal';
import PickStepModal from '../StepsModal/PickStepModal';
import { postDrawings } from '../../store/userData/slice';

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

  const { drawings, justGenDrawId } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const generatedId = `${useId()}${new Date().getTime()}`;

  console.log('generatedId:', typeof generatedId, generatedId);

  const voice = new Voice();
  voice.initialize({ lang: 'ru-RU', debug: false });

  const lineCountSettings = process.env.REACT_APP_LINES_SET || '3700';
  // const lineSetArr = lineCountSettings.split(',');
  //
  // const generalSettingsArr = lineSetArr.map((linesNum, index) => {
  //   return { lines: Number(linesNum), outputCanvasId: `canvasOutput${index}` };
  // });

  useEffect(() => {
    if (justGenDrawId) {
      setGeneratorStep(2);
    }
  }, [justGenDrawId]);

  useEffect(() => {
    console.log('useEffect justGenDrawId:', justGenDrawId);
    if (justGenDrawId && generatorStep === 2) {
      console.log('useEffect drawings:', drawings);
      const steps = drawings.find((el) => el.f_id === justGenDrawId)?.steps;
      console.log('useEffect steps:', steps);

      drawLinesSync('canvasGray', steps);
    }
  }, [justGenDrawId, drawings, generatorStep]);

  const onPlayClick = () => {
    if (selectedRes.stepsArr) {
      setStepsModalOpen(true);
      setIsPlaying(true);
      showNextStep();
    }
  };

  const onChangeStepClick = () => {
    if (selectedRes.stepsArr) {
      setPickStepModalOpen(true);
    }
  };

  const setStepIndex = (index) => {
    setSelectedRes((prevRes) => {
      return { ...prevRes, currIndex: index };
    });

    setPickStepModalOpen(false);
  };

  const onStopClick = () => {
    setIsPlaying(false);
    // voice.shutUp()
  };

  const onFileSave = () => {
    if (selectedRes.stepsArr) {
      const fileTextArr = selectedRes.stepsArr
        .map((step) => Number(step) + 1)
        .join(', ');

      const blob = new Blob([...fileTextArr], {
        type: 'text/plain;charset=utf-8'
      });

      saveAs(blob, 'String art steps.txt');
    }
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

    // for (const settingsObj of generalSettingsArr) {
    //   const stepsArr = maxStepsArr.slice(0, settingsObj.lines + 1);
    //
    //   resArr.push({ stepsArr, outputCanvasId: settingsObj.outputCanvasId });
    // }

    // setResultsArr(resArr);

    // TODO ?? made img from canvas drawing

    setIsCalculating(false);

    dispatch(postDrawings({ drawings: [resObj] }));

    // const lineWidth = 0.03;
    const immediatelyFinished = false;

    drawLinesSync('canvasGray', stepsArr);

    // await Promise.all([
    //   ...resArr.map((resObj) =>
    //     drawLines(resObj.outputCanvasId, resObj.stepsArr, immediatelyFinished)
    //   ),
    //   ...resArr.map((resObj) =>
    //     drawLines(
    //       `${resObj.outputCanvasId}-hd`,
    //       resObj.stepsArr,
    //       immediatelyFinished
    //     )
    //   )
    // ]);

    // resArr.forEach((resObj) => {
    //   const canvas = document.getElementById(`${resObj.outputCanvasId}-hd`);
    //
    //   resObj.imgSrc = canvas.toDataURL('image/png');
    // });

    setProcessing(false);
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

  const onStepsModalClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setStepsModalOpen(false);
      // setSelectedRes({ ...selectedRes, currIndex: 0 });
      setCurrentStepText('');
      setIsPlaying(false);

      voice.shutUp();
    }
  };

  function showNextStep() {
    let i = selectedRes.currIndex;

    if (i < selectedRes.stepsArr?.length - 1) {
      // We add 1 to the point number as workaround, because the numbering on the
      // physical model does not start from 0, but from 1
      const nextPointNumber = Number(selectedRes.stepsArr[i + 1]) + 1;

      const textToShow = `Шаг ${i + 1}. Следующая точка: ${nextPointNumber}`;
      const textToSpeak = `${nextPointNumber}`;

      setCurrentStepText(textToShow);

      voice.say(textToSpeak);

      setSelectedRes({ ...selectedRes, currIndex: i + 1 });
    } else {
      voice.say('Конец!');
      setCurrentStepText('Конец!');

      setIsPlaying(false);
    }
  }

  useInterval(
    () => {
      showNextStep();
    },
    isPlaying ? delay : null
  );

  return (
    <>
      {/*<img className="hidden" id="imageSrc" alt="Source" src={baseImageSrc} />*/}
      {!baseImageSrc && generatorStep === 0 && (
        <PhotoInputCenter onFileUploaded={photoUploadedHandler} />
      )}
      {baseImageSrc && generatorStep === 1 && (
        <GeneratorSettingsContainer
          imageSrc={baseImageSrc}
          setImageSrc={setBaseImageSrc}
          onFileUploaded={photoUploadedHandler}
          onGenerate={generateButtonHandler}
          baseImgRef={baseImgRef}
        />
      )}
      {generatorStep === 2 && (
        <ResultsContainer
          onFileUploaded={photoUploadedHandler}
          delay={delay}
          setDelay={setDelay}
          onPlayClick={onPlayClick}
          onChangeStepClick={onChangeStepClick}
          // generalSettings={generalSettingsArr}
          // pickCanvasHandler={pickCanvasHandler}
          selectedRes={selectedRes}
          processing={processing}
          onFileSave={onFileSave}
          lineCalcProgress={lineCalcProgress}
          isCalculating={isCalculating}
        />
      )}
      <StepsModal
        open={stepsModalOpen}
        handleClose={onStepsModalClose}
        isPlaying={isPlaying}
        onPlayClick={onPlayClick}
        onStopClick={onStopClick}
        currentStepText={currentStepText}
      />
      <PickStepModal
        open={pickStepModalOpen}
        onClose={() => {
          setPickStepModalOpen(false);
        }}
        selectedRes={selectedRes}
        setSelectedRes={setSelectedRes}
        setStepIndex={setStepIndex}
      />
    </>
  );
};

export default GeneratorMainBlock;
