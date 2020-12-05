import { createReducer } from '@reduxjs/toolkit';

import { IAppState } from 'reducers/types';
import { ILoadVideos, loadVideos } from 'actions/app.actions';

const initialState: IAppState = {
  videos: [],
};

const AppReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadVideos.fulfilled, (state: IAppState, action: ILoadVideos) => ({ ...state, videos: action.payload }));
});

export default AppReducer;
