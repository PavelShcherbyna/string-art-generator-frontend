import React, { useState } from 'react';
import Voice from 'artyom.js';
import { useInterval } from 'usehooks-ts';
import PhotoInputCenter from '../PhotoInputCenter/PhotoInputCenter';
import GeneratorSettingsContainer from '../GeneratorSettingsContainer/GeneratorSettingsContainer';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import {
  createStringArt,
  DrawResIntoCanvas
} from '../../stringGeneratorScript/stringArtMainScript';
import StepsModal from '../StepsModal/StepsModal';

const GeneratorMainBlock = () => {
  const [baseImageSrc, setBaseImageSrc] = useState('');
  const [generatorStep, setGeneratorStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [delay, setDelay] = useState(5000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resultsArr, setResultsArr] = useState([{}]); // { stepsArr, mathResult, outputCanvasId }
  const [selectedRes, setSelectedRes] = useState({}); // { stepsArr, outputCanvasId, currIndex }
  const [stepsModalOpen, setStepsModalOpen] = useState(false);
  const [currentStepText, setCurrentStepText] = useState('');

  const voice = new Voice();
  voice.initialize({ lang: 'ru-RU', debug: false });

  const lineCountSettings = process.env.REACT_APP_LINES_SET || '';
  const lineSetArr = lineCountSettings.split(',');

  const generalSettingsArr = lineSetArr.map((linesNum, index) => {
    return { lines: Number(linesNum), outputCanvasId: `canvasOutput${index}` };
  });

  const onPlayClick = () => {
    if (selectedRes.stepsArr) {
      setStepsModalOpen(true);
      setIsPlaying(true);
      showNextStep();
    }
  };

  const onStopClick = () => {
    setIsPlaying(false);
    // voice.shutUp()
  };

  const photoUploadedHandler = (e) => {
    if (e.target.files[0]) {
      setBaseImageSrc(URL.createObjectURL(e.target.files[0]));
      setGeneratorStep(1);

      let imgElement = document.getElementById('imageSrc');
      imgElement.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const generateButtonHandler = async () => {
    await setGeneratorStep(2);
    setProcessing(true);
    setSelectedRes({});

    const resArr = [];

    for (const settingsObj of generalSettingsArr) {
      const result = await createStringArt(
        settingsObj.lines,
        settingsObj.outputCanvasId,
        resArr[resArr.length - 1]?.mathResult,
        resArr[resArr.length - 1]?.stepsArr
      );
      resArr.push({ ...result, outputCanvasId: settingsObj.outputCanvasId });
    }

    setResultsArr(resArr);

    setProcessing(false);
  };

  const pickCanvasHandler = (e) => {
    if (!processing) {
      const resObj = resultsArr.find((el) => el.outputCanvasId === e.target.id);

      if (resObj) {
        const { stepsArr, mathResult, outputCanvasId } = resObj;
        DrawResIntoCanvas(mathResult, 455, 'canvasGray'); // size - width and height of target canvas

        setSelectedRes({ stepsArr, outputCanvasId, currIndex: 0 });
      }
    }
  };

  const onStepsModalClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setStepsModalOpen(false);
      setSelectedRes({ ...selectedRes, currIndex: 0 });
      setCurrentStepText('');
      setIsPlaying(false);

      voice.shutUp();
    }
  };

  function showNextStep() {
    let i = selectedRes.currIndex;

    if (i < selectedRes.stepsArr?.length - 1) {
      const textToShow = `Следующая точка: ${selectedRes.stepsArr[i + 1]}`;
      const textToSpeak = `${selectedRes.stepsArr[i + 1]}`;

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
      <img className="hidden" id="imageSrc" alt="Source" />
      {!baseImageSrc && generatorStep === 0 && (
        <PhotoInputCenter onFileUploaded={photoUploadedHandler} />
      )}
      {baseImageSrc && generatorStep === 1 && (
        <GeneratorSettingsContainer
          imageSrc={baseImageSrc}
          onFileUploaded={photoUploadedHandler}
          onGenerate={generateButtonHandler}
        />
      )}
      {generatorStep === 2 && (
        <ResultsContainer
          onFileUploaded={photoUploadedHandler}
          delay={delay}
          setDelay={setDelay}
          onPlayClick={onPlayClick}
          generalSettings={generalSettingsArr}
          pickCanvasHandler={pickCanvasHandler}
          selectedRes={selectedRes}
          processing={processing}
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
    </>
  );
};

export default GeneratorMainBlock;
