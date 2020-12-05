import axios from 'axios';

const BASE_URL = '/api/videos';

export const fetchVideos = (): Promise<string[]> => axios.get<void, string[]>(`${ BASE_URL }`);
