import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';

import 'components/Loader/Loader.scss';

interface ILoader {
  size: string | number;
}

const Loader: FC<ILoader> = ({ size }) => (
  <div className="loader-wrapper">
    <CircularProgress size={size} />
  </div>
);

export default Loader;
