import { combineReducers } from 'redux';

import AppReducer from 'reducers/app.reducer';
import VideoReducer from 'reducers/video.reducer';

const rootReducer = combineReducers({
  app: AppReducer,
  video: VideoReducer,
});

export default rootReducer;
