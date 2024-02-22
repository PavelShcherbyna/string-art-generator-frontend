import React from 'react';
import DownloadSVG from '../../assets/download_icon.svg';
import { AnotherInputContainer } from './styles';
import { FormattedMessage } from 'react-intl';

const LoadAnotherInput = ({ className = '', onFileUploaded }) => {
  return (
    <AnotherInputContainer className={`${className}`}>
      <img src={DownloadSVG} alt="download" />
      <FormattedMessage
        id="app.upload.another.img.input"
        defaultMessage="Choose another picture"
      />
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
