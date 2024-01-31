import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {
  InstallPWABtn,
  InstallPWAContent,
  SnackbarPWAInstallWrapper
} from './styles';
import logoPng from '../../assets/logo.png';
import { FormattedMessage } from 'react-intl';

const SnackbarPWAInstall = ({ open, handleClose, handleAction }) => {
  const PWASnackbarContent = (
    <InstallPWAContent>
      <img src={logoPng} alt="Logotype" />
      <p>
        <FormattedMessage
          id="pwa.popup.text"
          defaultMessage="Install the “String Art” {br} application"
          values={{ br: <br /> }}
        />
      </p>
      <InstallPWABtn onClick={handleAction}>
        <FormattedMessage id="pwa.popup.btn" defaultMessage="Install" />
      </InstallPWABtn>
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
