import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import 'components/Error/Error.scss';

interface IError {
  content: string;
}

const Error: FC<IError> = ({ content }) => (
  <Grid className="error" item xs={12}>
    <div className="content" data-testid="error">{ content }</div>
  </Grid>
);

export default Error;
