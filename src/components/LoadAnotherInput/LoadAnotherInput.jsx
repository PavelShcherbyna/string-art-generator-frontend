import React from 'react';
import DownloadSVG from '../../assets/download_icon.svg';
import { AnotherInputContainer } from './styles';

const LoadAnotherInput = ({ className = '', onFileUploaded }) => {
  return (
    <AnotherInputContainer className={`${className}`}>
      <img src={DownloadSVG} alt="download" />
      Загрузить другое фото
      <input
        onChange={(e) => onFileUploaded(e)}
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
      />
    </AnotherInputContainer>
  );
};

export default LoadAnotherInput;
