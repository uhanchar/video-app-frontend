import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'components/App/App.scss';
import Header from 'components/Header/Header';
import VideoList from 'components/VideoList/VideoList';
import UploadVideo from 'components/UploadVideo/UploadVideo';
import { LocationPath } from 'constants/location-path';

const App = () => (
  <div className="app">
    <Header />

    <Switch>
      <Route path={LocationPath.Home} exact component={VideoList} />
      <Route path={LocationPath.Upload} exact component={UploadVideo} />
    </Switch>
  </div>
);

export default App;
