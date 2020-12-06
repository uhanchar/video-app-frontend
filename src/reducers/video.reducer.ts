import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { IVideoItem, IVideoState } from 'reducers/types';
import { loadSelectedVideo, clearVideoState } from 'actions/video.actions';

const initialState: IVideoState = {
  video: null,
};

const VideoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadSelectedVideo.fulfilled, (state: IVideoState, action: PayloadAction<IVideoItem>) => ({ ...state, video: action.payload }))
    .addCase(clearVideoState, () => ({ ...initialState }));
});

export default VideoReducer;
