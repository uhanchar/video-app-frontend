import React, { SyntheticEvent, MouseEvent, FC } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export interface IUploadConfirmation {
  isOpen: boolean;
  closeSnackbar: () => void;
}

const UploadConfirmation: FC<IUploadConfirmation> = ({ isOpen, closeSnackbar }) => {
  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Video was successfully uploaded"
      action={(
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    />
  );
};

export default UploadConfirmation;
