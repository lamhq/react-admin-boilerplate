import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../../mdpr/assets/jss/material-dashboard-pro-react/layouts/adminStyle';
import logo from '../../../../public/logo.svg';
import { withAuth } from '../../../common/hocs';
import AdminNavbar from './Navbars/AdminNavbar';
import Sidebar from './Sidebar/Sidebar';
import { appName } from '../../../config';
import TopButton from './TopButton';

const useStyles = makeStyles(styles);

function AdminLayout(props) {
  const { children, title, ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(false);
  const [topBtnVisible, setTopBtnVisibility] = React.useState(false);
  const color = 'blue';
  const bgColor = 'black';
  // styles
  const classes = useStyles();
  const mainPanelClasses = `${classes.mainPanel
  } ${
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1,
    })}`;
  // ref for main panel div
  const mainPanel = React.useRef(null);

  /**
   * Go to top when Top button is clicked
   */
  function handleTopBtnClick() {
    mainPanel.current.scrollTop = 0;
  }

  /**
   * Display Top button base on scroll position
   */
  function handleScroll(e) {
    setTopBtnVisibility(e.target.scrollTop > 100);
  }

  // functions for changeing the states from components
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener('resize', resizeFunction);
    };
  });

  React.useEffect(() => {
    document.body.style.overflow = 'unset';
    if (title) {
      document.title = `${title} - ${appName}`;
    }
  }, [title]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        logoText="REST BOILERPLATE"
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel} onScroll={handleScroll}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize}
          miniActive={miniActive}
          brandText={title}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{children}</div>
          {topBtnVisible && <TopButton onClick={handleTopBtnClick} />}
        </div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

AdminLayout.defaultProps = {
  title: '',
};

export default withAuth('/admin/login')(AdminLayout);
