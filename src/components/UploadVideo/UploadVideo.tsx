import React, { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import 'components/UploadVideo/UploadVideo.scss';
import { isNotValidFormat } from 'helpers/file-format-validation.helper';
import { WRONG_FILE_FORMAT_MESSAGE } from 'constants/error-messages';

const UploadVideo = () => {
  const [ fileName, setFileName ] = useState<string>('');
  const [ fileTitle, setFileTitle ] = useState<string>('');
  const [ fileDescription, setFileDescription ] = useState<string>('');
  const [ file, setFile ] = useState<File | null>(null);
  const [ error, setError ] = useState<string>('');
  const fileInput = useRef<HTMLInputElement | null>(null);

  const onBrowseClick = () => {
    if (fileInput.current) {
      (fileInput.current! as HTMLInputElement).value = '';
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');

    const fileToUpload = event.target.files?.item(0);

    if (!fileToUpload) {
      return;
    }

    if (!isNotValidFormat(fileToUpload.type)) {
      setError(WRONG_FILE_FORMAT_MESSAGE);

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

  const handleFileDataSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    // TODO: Add file submitting logic
  };

  const sendButtonDisabled = !!error || !fileTitle.trim().length || !file;

  const renderError = () => (
    error && (
      <Grid className="upload-controls" item xs={12}>
        <div className="error">{ error }</div>
      </Grid>
    )
  );

  return (
    <div className="upload-video">
      <div className="title">Upload video</div>

      <form className="form">
        <Grid container className="container" spacing={3} justify="center" alignItems="center">
          <Grid className="upload-controls" item xs={12}>
            <div className="filename">{ fileName }</div>
          </Grid>

          { renderError() }

          <Grid className="upload-controls" item xs={12} md={6} lg={4}>
            <input
              id="contained-button-file"
              className="input"
              accept="video/*"
              type="file"
              multiple={false}
              ref={fileInput}
              onChange={handleFileChange}
            />

            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
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
                disabled={sendButtonDisabled}
                onClick={handleFileDataSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UploadVideo;
