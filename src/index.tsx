import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'index.css';
import { isProduction } from 'constants/environtments';
import App from 'components/App/App';
import store from 'store';
import reportWebVitals from 'reportWebVitals';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

if (!isProduction() && module.hot) {
  module.hot.accept('./components/App/App', renderApp);
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
