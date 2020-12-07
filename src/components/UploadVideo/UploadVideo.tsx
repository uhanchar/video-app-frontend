import React, { ChangeEvent, FC, SyntheticEvent, useCallback, useRef, useState } from 'react';
import { Button, Grid, LinearProgress, TextField } from '@material-ui/core';

import 'components/UploadVideo/UploadVideo.scss';
import { isValidFileSize, isValidFormat } from 'helpers/file-format-validation.helper';
import { ErrorMessages } from 'constants/error-messages.enum';
import { uploadVideo } from 'services/upload-video.service';
import UploadConfirmation from 'components/UploadConfirmation/UploadConfirmation';
import Error from 'components/Error/Error';

const UploadVideo: FC = () => {
  const [ fileName, setFileName ] = useState<string>('');
  const [ fileTitle, setFileTitle ] = useState<string>('');
  const [ fileDescription, setFileDescription ] = useState<string>('');
  const [ file, setFile ] = useState<File | null>(null);
  const [ error, setError ] = useState<string>('');
  const [ serverError, setServerError ] = useState('');
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ loadingProgress, setIsLoadingProgress ] = useState<number>(0);
  const [ isConfirmationOpen, setIsConfirmationOpen ] = useState<boolean>(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const onBrowseClick = () => {
    if (fileInput.current) {
      (fileInput.current! as HTMLInputElement).value = '';
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setServerError('');

    const fileToUpload = event.target.files?.item(0);

    if (!fileToUpload) {
      return;
    }

    if (!isValidFormat(fileToUpload.name)) {
      setError(ErrorMessages.WRONG_FILE_FORMAT_MESSAGE);

      return;
    }

    if (!isValidFileSize(fileToUpload.size)) {
      setError(ErrorMessages.INVALID_FILE_SIZE);

      return;
    }

    setFileName(fileToUpload.name);
    setFile(fileToUpload);
  };

  const onFileTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileTitle(event.target.value);
  };

  const onFileDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileDescription(event.target.value);
  };

  const clearState = () => {
    setFileName('');
    setFileTitle('');
    setFileDescription('');
    setFile(null);
    setIsLoading(false);
    setIsLoadingProgress(0);
  };

  const handleFileDataSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setServerError('');
    setIsLoading(true);

    try {
      await uploadVideo({ fileName: fileTitle, fileDescription, file: file! }, setIsLoadingProgress);

      clearState();
      setIsConfirmationOpen(true);
    } catch (err) {
      setIsLoading(false);
      setIsLoadingProgress(0);

      const errorMessage = err?.response?.data;
      setServerError(errorMessage || ErrorMessages.GENERIS_SERVER_ERROR_MESSAGE);
    }
  };

  const closeConfirmation = useCallback(() => {
    setIsConfirmationOpen(false);
  }, []);

  const sendButtonDisabled = !!error || isLoading || !fileTitle.trim().length || !file;

  const renderError = (content: string) => (
    content && (
      <Error content={content} />
    )
  );

  const renderFileLoadingProgress = () => (
    isLoading && (
      <Grid className="upload-controls" item xs={12} data-testid="linear-progress">
        <Grid item xs={12} md={6} lg={4}>
          <LinearProgress className="progress" variant="determinate" value={loadingProgress} />
        </Grid>
      </Grid>
    )
  );

  return (
    <div className="upload-video">
      <div className="title">Upload video</div>

      <form className="form">
        <Grid container className="container" spacing={3} justify="center" alignItems="center">
          <Grid className="upload-controls" item xs={12}>
            <div className="filename" data-testid="file-name">{ fileName }</div>
          </Grid>

          { renderError(error) }

          { renderError(serverError) }

          { renderFileLoadingProgress() }

          <Grid className="upload-controls" item xs={12} md={6} lg={4}>
            <input
              id="contained-button-file"
              className="input"
              accept="video/*"
              type="file"
              multiple={false}
              ref={fileInput}
              disabled={isLoading}
              data-testid="file-input"
              onChange={handleFileChange}
            />

            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                disabled={isLoading}
                onClick={onBrowseClick}
              >
                Upload
              </Button>
            </label>
          </Grid>

          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="video-title"
                label="Title"
                variant="outlined"
                className="text-input"
                fullWidth
                required
                data-testid="file-title"
                value={fileTitle}
                onChange={onFileTitleChange}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                multiline
                fullWidth
                data-testid="file-description"
                className="text-input"
                value={fileDescription}
                onChange={onFileDescriptionChange}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid container item xs={12} sm={6} md={2} lg={1} justify="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="submit-button"
                data-testid="file-submit"
                disabled={sendButtonDisabled}
                onClick={handleFileDataSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <UploadConfirmation isOpen={isConfirmationOpen} closeSnackbar={closeConfirmation} />
    </div>
  );
};

export default UploadVideo;
