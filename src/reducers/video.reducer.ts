import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { IVideoItem, IVideoState } from 'reducers/types';
import { loadSelectedVideo, clearVideoState } from 'actions/video.actions';

const initialState: IVideoState = {
  video: null,
  isLoading: false,
  error: '',
};

const VideoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadSelectedVideo.pending, (state: IVideoState) => ({ ...state, isLoading: true, error: '' }))
    .addCase(loadSelectedVideo.fulfilled, (state: IVideoState, action: PayloadAction<IVideoItem>) => ({
      ...state,
      video: action.payload,
      isLoading: false,
    }))
    .addCase(loadSelectedVideo.rejected, (state: IVideoState, action) => ({
      ...state,
      isLoading: false,
      error: action.error.message as string,
    }))
    .addCase(clearVideoState, () => ({ ...initialState }));
});

export default VideoReducer;
