import {useEffect, useState} from 'react';
import cn from 'classnames';
import {
  canvasInit,
  NonBlockingCalculatePins,
  NonBlockingPrecalculateLines, setSettings,
  testFunc
} from "../stringGeneratorScript/functionsFromHTML";




const FileInput = () => {
  const [btnActive, setBtnActive] = useState(false);

  const imgUploaded = (e, setBtnActive) => {
    let imgElement = document.getElementById('imageSrc');
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    setBtnActive(true);
  };

  const startHandle = async () => {
    // const strGenerator = new StringArtGenerator();
    // strGenerator.imgInit();
    // strGenerator.NonBlockingLineCalculator();
    // strGenerator.imgInitTest();


    // testFunc()
    canvasInit();
    await NonBlockingCalculatePins();
    setSettings(288, 1000, 'canvasOutput2');
    // NonBlockingCalculatePins();
    // setSettings(288, 2000, 'canvasOutput3');
    // NonBlockingCalculatePins();
    // NonBlockingPrecalculateLines();
  }


  return (
    <>
      <label className="btn btn-primary btn-file">
        Click Here and select an Image to Start{' '}
        <input onChange={(e) => imgUploaded(e, setBtnActive)} type="file" id="fileInput" style={{ display: 'none' }} />
      </label>
      <img className="rounded mx-auto d-block" id="imageSrc" alt="No Image" />
      <button className={cn('btn btn-lg btn-block', { 'btn-primary': btnActive })}
              disabled={!btnActive}
              onClick={() => startHandle()}
      >
        START
      </button>

      <div id="step2" className="inputoutput center ">
        <div className="caption">Cropped and Grayscaled:</div>
        <canvas className="centerCanvasMedium" id="canvasGray"/>
        <div style={{display: 'flex'}}>
          <canvas className="centerCanvasMedium" id="canvasOutput1"/>
          <canvas className="centerCanvasMedium" id="canvasOutput2"/>
          <canvas className="centerCanvasMedium" id="canvasOutput3"/>
        </div>

      </div>
    </>
  );
};

export default FileInput;
