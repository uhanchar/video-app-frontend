import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { CLEAR_VIDEO_STATE, LOAD_SELECTED_VIDEO } from 'actions/types';
import { fetchSelectedVideo } from 'services/video.service';
import { ErrorMessages } from 'constants/error-messages.enum';

export const clearVideoState = createAction(CLEAR_VIDEO_STATE);

export const loadSelectedVideo = createAsyncThunk(LOAD_SELECTED_VIDEO, (videoId: string, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return fetchSelectedVideo(videoId);
  } catch (error) {
    const errorMessage = error?.response?.data;

    return rejectWithValue(errorMessage || ErrorMessages.GENERIS_SERVER_ERROR_MESSAGE);
  }
});
