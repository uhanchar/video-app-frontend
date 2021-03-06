import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import 'components/VideoList/VideoList.scss';
import { loadVideos } from 'actions/app.actions';
import { IVideoItem, RootState } from 'reducers/types';
import VideoCard from 'components/VideoCard/VideoCard';

const VideoList: FC = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(loadVideos());
  }, []);

  return (
    <div className="video-list">
      <Grid container item xs={12} spacing={2}>
        {videos && videos.map((video: IVideoItem) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={video.id} data-testid="video-item">
            <VideoCard {...video} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VideoList;
