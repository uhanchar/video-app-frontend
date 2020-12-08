import React, { FC, useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';

import 'components/VideoCard/VideoCard.scss';
import { IVideoItem } from 'reducers/types';
import { useHistory } from 'react-router-dom';
import { LocationPath } from 'constants/location-path.enum';
import { formatValidDate } from 'helpers/date-format.helper';

const VideoCard: FC<IVideoItem> = (props: IVideoItem) => {
  const { name, description, createdAt, link, thumbnailLink, id } = props;
  const history = useHistory();
  const [ isPlaying, setIsPlaying ] = useState<boolean>(false);

  const onCardClick = () => {
    history.push(`${ LocationPath.Video }/${ id }`);
  };

  const onMouseVideoEnter = () => {
    setIsPlaying(true);
  };

  const onMouseVideoLeave = () => {
    setIsPlaying(false);
  };

  return (
    <Card className="video-card" onClick={onCardClick} data-testid="video-card">
      <CardHeader
        title={name}
        subheader={formatValidDate(createdAt)}
      />

      <CardMedia
        className="media"
        data-testid="video-card-media"
        onMouseOver={onMouseVideoEnter}
        onMouseOut={onMouseVideoLeave}
      >
        <ReactPlayer
          url={`/${ link }`}
          light={isPlaying ? false : `/${ thumbnailLink }`}
          className="player"
          data-testid="video-card-player"
          loop
          playing={isPlaying}
          volume={0}
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
