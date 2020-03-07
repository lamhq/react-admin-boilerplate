import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

// material-ui icons
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ViewList from '@material-ui/icons/ViewList';

// core components
import Button from '../../../../mdpr/components/CustomButtons/Button';
import styles from '../../../../mdpr/assets/jss/material-dashboard-pro-react/components/adminNavbarStyle';

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const {
    brandText, miniActive, sidebarMinimize, handleDrawerToggle,
  } = props;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={classes.sidebarMinimize}>
            {miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {brandText}
          </Button>
        </div>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string.isRequired,
  miniActive: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  sidebarMinimize: PropTypes.func.isRequired,
};
