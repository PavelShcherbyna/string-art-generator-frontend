import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {
  InstallPWABtn,
  InstallPWAContent,
  SnackbarPWAInstallWrapper
} from './styles';
import logoPng from '../../assets/logo.png';

const SnackbarPWAInstall = ({ open, handleClose, handleAction }) => {
  const PWASnackbarContent = (
    <InstallPWAContent>
      <img src={logoPng} alt="Logotype" />
      <p>
        Установите приложение
        <br /> "String Art"
      </p>
      <InstallPWABtn onClick={handleAction}>Установить</InstallPWABtn>
    </InstallPWAContent>
  );

  return (
    <SnackbarPWAInstallWrapper>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={10000}
        onClose={handleClose}
        message={PWASnackbarContent}
      />
    </SnackbarPWAInstallWrapper>
  );
};

export default SnackbarPWAInstall;
