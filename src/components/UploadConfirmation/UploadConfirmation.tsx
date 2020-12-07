import React, { FC } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export interface IUploadConfirmation {
  isOpen: boolean;
  closeSnackbar: () => void;
}

const UploadConfirmation: FC<IUploadConfirmation> = ({ isOpen, closeSnackbar }) => {
  const handleClose = () => {
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
      data-testid="close-confirmation"
      onClose={handleClose}
      message="Video was successfully uploaded"
      action={(
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          data-testid="close-confirmation-button"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    />
  );
};

export default UploadConfirmation;
