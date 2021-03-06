import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'api-configurator';
import 'index.scss';
import { isProduction } from 'constants/environtments';
import App from 'components/App/App';
import store from 'store';
import reportWebVitals from 'reportWebVitals';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
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
