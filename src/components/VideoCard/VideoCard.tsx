import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { formatDistance } from 'date-fns';
import HoverVideoPlayer from 'react-hover-video-player';

import 'components/VideoCard/VideoCard.scss';
import { IVideoItem } from 'reducers/types';
import { useHistory } from 'react-router-dom';
import { LocationPath } from 'constants/location-path.enum';

const VideoCard = (props: IVideoItem) => {
  const { name, description, createdAt, link, id } = props;
  const history = useHistory();

  const formatVideDate = (): string => `${ formatDistance(new Date(createdAt), new Date()) } ago`;

  const onCardClick = () => {
    history.push(`${ LocationPath.Upload }/${ id }`);
  };

  const renderPreviewLoader = () => (
    <CircularProgress size="2rem" className="loading" />
  );

  return (
    <Card className="video-card" onClick={onCardClick}>
      <CardHeader
        title={name}
        subheader={formatVideDate()}
      />

      <CardMedia className="media">
        <HoverVideoPlayer
          className="preview"
          videoSrc={link}
          sizingMode="container"
          loadingOverlay={renderPreviewLoader()}
        />
      </CardMedia>

      <CardContent className="content">
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="description"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
