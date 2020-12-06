import { NullableType } from 'constants/data-types';

export interface IVideoItem {
  id: string;
  name: string;
  description: string;
  link: string;
  thumbnailLink: string;
  createdAt: Date;
}

export interface IAppState {
  videos: IVideoItem[];
}

export interface IVideoState {
  video: NullableType<IVideoItem>;
  isLoading: boolean;
  error: string;
}

export type RootState = {
  app: IAppState;
  video: IVideoState;
};
