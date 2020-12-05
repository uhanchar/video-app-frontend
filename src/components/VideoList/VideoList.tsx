import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import 'components/VideoList/VideoList.scss';
import { loadVideos } from 'actions/app.actions';

const VideoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadVideos());
  }, []);

  return (
    <div className="video-list">Video List works!</div>
  );
};

export default VideoList;
