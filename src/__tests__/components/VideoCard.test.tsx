import React from 'react';
import { fireEvent } from '@testing-library/react';

import { render as renderWithRedux } from 'test-utils';
import VideoCard from 'components/VideoCard/VideoCard';
import { IVideoItem } from 'reducers/types';
import { mockHistoryPush } from 'setupTests';
import { LocationPath } from 'constants/location-path.enum';

const videoItem: IVideoItem = {
  id: '39432ff1585cfb0ed1803ccea2929341',
  name: 'enem2',
  description: '',
  link: 'media/videos/39432ff1585cfb0ed1803ccea2929341',
  thumbnailLink: 'media/thumbnails/39432ff1585cfb0ed1803ccea2929341.png',
  createdAt: new Date(),
};

describe('test for VideoCard component', () => {
  it('should render VideoCard component', () => {
    const { asFragment } = renderWithRedux(<VideoCard {...videoItem} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should redirect to Video component on Card component click', () => {
    const { getByTestId } = renderWithRedux(<VideoCard {...videoItem} />);

    fireEvent.click(getByTestId('video-card'));

    expect(mockHistoryPush).toHaveBeenCalledWith(`${ LocationPath.Video }/${ videoItem.id }`);
  });
});
