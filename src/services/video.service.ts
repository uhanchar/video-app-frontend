import axios from 'axios';
import { IVideoItem } from 'reducers/types';

const BASE_URL = '/api/video';

export const fetchSelectedVideo = (videoId: string): Promise<IVideoItem> => axios.get<void, IVideoItem>(`${ BASE_URL }/${ videoId }`);
