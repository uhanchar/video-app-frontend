import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import 'components/App/App.scss';
import Header from 'components/Header/Header';
import VideoList from 'components/VideoList/VideoList';
import UploadVideo from 'components/UploadVideo/UploadVideo';
import Video from 'components/Video/Video';
import { LocationPath } from 'constants/location-path.enum';

const App = () => (
  <div className="app">
    <Header />

    <Container maxWidth="xl" className="container">
      <Switch>
        <Route path={LocationPath.Home} exact component={VideoList} />

        <Route path={LocationPath.Upload} exact component={UploadVideo} />

        <Route path={`${ LocationPath.Video }/:id`} component={Video} />
      </Switch>
    </Container>
  </div>
);

export default App;
