import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../../mdpr/assets/jss/material-dashboard-pro-react/layouts/authStyle';
import login from '../../../mdpr/assets/img/login.jpeg';
import { appName } from '../../../config';

const useStyles = makeStyles(styles);

export default function GuestLayout(props) {
  const { children, title } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  const classes = useStyles();

  React.useEffect(() => {
    document.body.style.overflow = 'unset';
    if (title) {
      document.title = `${title} - ${appName}`;
    }
  }, [title]);

  return (
    <div>
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: `url(${login})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

GuestLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

GuestLayout.defaultProps = {
  title: '',
};
