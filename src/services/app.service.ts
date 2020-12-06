import axios from 'axios';
import { IVideoItem } from 'reducers/types';

const BASE_URL = '/api/videos';

export const fetchVideos = (): Promise<IVideoItem[]> => axios.get<void, IVideoItem[]>(`${ BASE_URL }`);
