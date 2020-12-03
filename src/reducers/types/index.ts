export interface IAppState {
  videos: string[];
}

export type RootState = {
  app: IAppState;
};
