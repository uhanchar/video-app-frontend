import { createReducer } from '@reduxjs/toolkit';

import { IAppState } from 'reducers/types';
import { loadVideos } from 'actions/app.actions';

const initialState: IAppState = {
  videos: [],
};

const AppReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadVideos, (state: IAppState) => ({ ...state }));
});

export default AppReducer;
