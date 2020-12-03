import { createAction } from '@reduxjs/toolkit';

import { LOAD_VIDEOS } from 'actions/types';

export const loadVideos = createAction(LOAD_VIDEOS);
