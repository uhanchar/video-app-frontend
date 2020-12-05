import { Dispatch } from 'react';

export const updateFileUploadProgress = (event: ProgressEvent, setProgress: Dispatch<number>) => {
  const percentCompleted = Math.round((event.loaded * 100) / event.total);

  setProgress(percentCompleted);
};
