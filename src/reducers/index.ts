import { combineReducers } from 'redux';
import AppReducer from 'reducers/app.reducer';

const rootReducer = combineReducers({
  app: AppReducer,
});

export default rootReducer;
