import React, { FC } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import 'components/Header/Header.scss';
import { LocationPath } from 'constants/location-path.enum';

const Header: FC = () => {
  const history = useHistory();

  const onNavigateToUploadVideoPageButtonClick = () => {
    history.push(LocationPath.Upload);
  };

  return (
    <header className="header" data-testid="header">
      <NavLink to={LocationPath.Home} className="title">Video app</NavLink>

      <Button
        variant="contained"
        color="primary"
        size="small"
        data-testid="header-navigate-button"
        onClick={onNavigateToUploadVideoPageButtonClick}
      >
        Upload video
      </Button>
    </header>
  );
};

export default Header;
