import { useState } from 'react';
import cn from 'classnames';
import { createStringArt } from '../stringGeneratorScript/stringArtMainScript';

const FileInput = () => {
  const [btnActive, setBtnActive] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [resultsObj, setResultsObj] = useState({});
  const [selectedRes, setSelectedRes] = useState([]);

  const imgUploaded = (e, setBtnActive) => {
    let imgElement = document.getElementById('imageSrc');
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    setBtnActive(true);
  };

  const startHandle = async () => {
    setShowOutput(false);
    setShowLoading(true);
    setSelectedRes([]);

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
    setShowLoading(false);
  };

  const onOutCanvasClick = (e) => {
    if (showOutput) {
      setSelectedRes(resultsObj[e.target.id]);
    }
  };

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
        className={cn('btn btn-lg btn-block', { 'btn-primary': btnActive })}
        disabled={!btnActive}
        onClick={() => startHandle()}
      >
        START
      </button>

      <div id="step2" className="inputoutput center ">
        {/*<div className="caption">Cropped and Grayscaled:</div>*/}
        <canvas className="centerCanvasMedium" id="canvasGray" style={{ display: 'none' }} />

        <div style={{ display: 'flex' }}>
          <canvas
            className={cn('centerCanvasMedium canvasBlock', { clickableCanvas: showOutput })}
            id="canvasOutput1"
            onClick={(e) => onOutCanvasClick(e)}
          />
          <canvas
            className={cn('centerCanvasMedium canvasBlock', { clickableCanvas: showOutput })}
            id="canvasOutput2"
            onClick={(e) => onOutCanvasClick(e)}
          />
          <canvas
            className={cn('centerCanvasMedium canvasBlock', { clickableCanvas: showOutput })}
            id="canvasOutput3"
            onClick={(e) => onOutCanvasClick(e)}
          />
        </div>

        {showLoading && <div className={'caption center'}>In progress...</div>}
      </div>
      {selectedRes && selectedRes.length > 0 && (
        <textarea readOnly style={{ width: '70%', height: '200px' }} value={selectedRes.join(', ')} />
      )}
    </>
  );
};

export default FileInput;
