import axios from 'axios';
import { Dispatch } from 'react';

import { updateFileUploadProgress } from 'helpers/file-upload-progress.helper';

const BASE_URL = '/api/upload-video';

export interface IUploadVideoData {
  fileName: string;
  fileDescription?: string;
  file: File;
}

export const uploadVideo = (fileData: IUploadVideoData, setProgress: Dispatch<number>): Promise<void> => {
  const formData = new FormData();

  formData.append('fileName', fileData.fileName);
  formData.append('fileDescription', fileData.fileDescription || '');
  formData.append('file', fileData.file);

  return axios.post<IUploadVideoData, void>(`${ BASE_URL }`, formData, {
    onUploadProgress: (event: ProgressEvent) => updateFileUploadProgress(event, setProgress),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
