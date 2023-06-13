import React from 'react';
import { BordFileInputContainer } from './styles';
import DownloadSVG from '../../assets/download_icon.svg';

const PhotoInputCenter = ({ onFileUploaded }) => {
  return (
    <BordFileInputContainer>
      <label>
        <img src={DownloadSVG} alt="download" />
        ЗАГРУЗИТЬ ФОТО
        <input
          onChange={(e) => onFileUploaded(e)}
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
        />
      </label>
    </BordFileInputContainer>
  );
};

export default PhotoInputCenter;
