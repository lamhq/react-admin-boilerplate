import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import sidebarStyle from './sidebarStyle';
import { useApi } from '../../../../common/hooks';

const useStyles = makeStyles(sidebarStyle);

export default function LogoutBtn({ children }) {
  const classes = useStyles();
  const { logout } = useApi();
  return (
    <div
      role="button"
      onClick={logout}
      className={cx(classes.itemLink, classes.userCollapseLinks, classes.logoutBtn)}
    >
      {children}
    </div>
  );
}

LogoutBtn.propTypes = {
  children: PropTypes.node.isRequired,
};

LogoutBtn.defaultProps = {
};
