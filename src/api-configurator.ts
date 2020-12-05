import axios, { AxiosResponse } from 'axios';

axios.interceptors.response.use((response: AxiosResponse) => {
  if (response && response.status === 200) {
    return response.data;
  }

  return response;
});
