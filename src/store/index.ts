import { configureStore } from '@reduxjs/toolkit';

import { isProduction } from 'constants/environtments';
import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer,
});

if (!isProduction() && module.hot) {
  module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
}

export default store;
