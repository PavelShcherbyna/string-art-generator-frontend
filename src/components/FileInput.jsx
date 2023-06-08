import React, { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import cn from 'classnames';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Voice from 'artyom.js';
import { createStringArt } from '../stringGeneratorScript/stringArtMainScript';
import { Typography } from '@mui/material';

const FileInput = () => {
  const [btnActive, setBtnActive] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [resultsObj, setResultsObj] = useState({});
  const [selectedRes, setSelectedRes] = useState({ stepsArr: [], currIndex: 0 });
  const [currentStepText, setCurrentStepText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [delay, setDelay] = useState(5000);

  const voice = new Voice();
  voice.initialize({ lang: 'en-GB' });

  const imgUploaded = (e, setBtnActive) => {
    let imgElement = document.getElementById('imageSrc');
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    setBtnActive(true);
  };

  const startHandle = async () => {
    setShowOutput(false);
    setProcessing(true);
    setSelectedRes({ stepsArr: [], currIndex: 0 });

    // const [linesArr1, linesArr2, linesArr3] = await Promise.all([
    //   createStringArt(),
    //   createStringArt(1500, 'canvasOutput2'),
    //   createStringArt(3000, 'canvasOutput3', 300)
    // ]);
    const linesArr1 = await createStringArt();
    const linesArr2 = await createStringArt(1500, 'canvasOutput2');
    const linesArr3 = await createStringArt(3000, 'canvasOutput3');

    setResultsObj({
      canvasOutput1: linesArr1,
      canvasOutput2: linesArr2,
      canvasOutput3: linesArr3
    });

    setShowOutput(true);
    setProcessing(false);
  };

  const onOutCanvasClick = (e) => {
    if (showOutput) {
      const stepsArr = resultsObj[e.target.id] || [];

      if (stepsArr.length > 0) {
        setSelectedRes({ stepsArr: stepsArr, currIndex: 0 });
      }
    }
  };

  const onPlayClick = () => {
    setIsPlaying(true);
    showNextStep();
  };

  const onStopClick = () => {
    setIsPlaying(false);
    // voice.shutUp()
  };

  function showNextStep() {
    let i = selectedRes.currIndex;

    if (i < selectedRes.stepsArr.length - 1) {
      const textToSpeak = `Line from ${selectedRes.stepsArr[i]} to ${selectedRes.stepsArr[i + 1]}`;
      setCurrentStepText(textToSpeak);

      voice.say(textToSpeak);

      setSelectedRes({ ...selectedRes, currIndex: i + 1 });
    } else {
      voice.say('Finish!');
      setCurrentStepText('Finish');

      setIsPlaying(false);
    }
  }

  useInterval(
    () => {
      showNextStep();
    },
    isPlaying ? delay : null
  );

  function onSliderChange(event, newValue) {
    setDelay(Number(newValue) * 1000);
  }

  return (
    <>
      <label className="btn btn-primary btn-file">
        Click Here and select an Image to Start{' '}
        <input onChange={(e) => imgUploaded(e, setBtnActive)} type="file" id="fileInput" style={{ display: 'none' }} />
      </label>
      <img
        className="rounded mx-auto d-block"
        id="imageSrc"
        alt="Source"
        style={{ maxWidth: '350px', maxHeight: '350px' }}
      />
      <button
        className={cn('btn btn-lg btn-block', { 'btn-primary': btnActive && !processing })}
        disabled={!btnActive || processing}
        onClick={() => startHandle()}
      >
        START
      </button>
      <div id="step2" className="inputoutput center ">
        {/*<div className="caption">Cropped and Grayscaled:</div>*/}
        <canvas className="centerCanvasMedium" id="canvasGray" style={{ display: 'none' }} />

        <div style={{ display: 'flex' }}>
          <canvas
            className={cn('centerCanvasMedium canvasBlock', { clickableCanvas: showOutput && !isPlaying })}
            id="canvasOutput1"
            onClick={(e) => onOutCanvasClick(e)}
          />
          <canvas
            className={cn('centerCanvasMedium canvasBlock', { clickableCanvas: showOutput && !isPlaying })}
            id="canvasOutput2"
            onClick={(e) => onOutCanvasClick(e)}
          />
          <canvas
            className={cn('centerCanvasMedium canvasBlock', { clickableCanvas: showOutput && !isPlaying })}
            id="canvasOutput3"
            onClick={(e) => onOutCanvasClick(e)}
          />
        </div>

        {processing && <div className={'caption center'}>In progress...</div>}
      </div>
      {selectedRes.stepsArr && selectedRes.stepsArr.length > 0 && (
        <div className={'flexCentered'}>
          <p>{currentStepText}</p>
          <Box sx={{ width: 300 }}>
            <Typography id="input-slider" gutterBottom>
              Intervals between steps: {delay / 1000} seconds
            </Typography>
            <Slider
              defaultValue={5}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v} sec`}
              onChange={onSliderChange}
              step={0.5}
              marks
              min={4}
              max={10}
            />
          </Box>
          <div>
            {isPlaying ? (
              <button className={cn('btn btn-lg btn-danger')} onClick={onStopClick}>
                STOP
              </button>
            ) : (
              <button className={cn('btn btn-lg btn-success')} onClick={onPlayClick}>
                PLAY
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FileInput;
