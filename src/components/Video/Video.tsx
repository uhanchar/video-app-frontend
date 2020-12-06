import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Grid, Typography } from '@material-ui/core';

import 'components/Video/Video.scss';
import { clearVideoState, loadSelectedVideo } from 'actions/video.actions';
import { RootState } from 'reducers/types';
import { formatValidDate } from 'helpers/date-format.helper';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';

interface IVideo {
  match: {
    params: {
      id: string;
    };
  };
}

const Video: FC<IVideo> = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const { video, isLoading, error } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    dispatch(loadSelectedVideo(id));

    return () => {
      dispatch(clearVideoState());
    };
  }, []);

  const renderLoader = () => (
    isLoading && (
      <Loader size="3rem" />
    )
  );

  const renderError = () => (
    error && (
      <Error content={error} />
    )
  );

  return (
    <div className="video">
      { renderLoader() }

      { renderError() }

      { !isLoading && video && !error && (
        <Grid container item className="container" justify="center" spacing={2} xs={12} sm={12} md={6}>
          <Grid item xs={12} className="item">
            <ReactPlayer url={`/${ video.link }`} controls className="player" />
          </Grid>

          <Grid item xs={12} className="text">
            <Typography variant="h4">{ video.name }</Typography>

            <Typography variant="overline" display="block">{ formatValidDate(video.createdAt) }</Typography>
          </Grid>

          <Grid item xs={12} className="text">
            <Typography variant="body2" gutterBottom className="text-content">{ video.description }</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Video;
