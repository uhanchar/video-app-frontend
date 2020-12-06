export interface IVideoItem {
  id: string;
  name: string;
  description: string;
  link: string;
  createdAt: Date;
}

export interface IAppState {
  videos: IVideoItem[];
}

export type RootState = {
  app: IAppState;
};
