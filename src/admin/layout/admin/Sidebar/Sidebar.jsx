/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

// core components
import sidebarStyle from './sidebarStyle';
import menus from './menus';
import User from './User';

class SidebarWrapper extends React.Component {
  sidebarWrapper = React.createRef();

  render() {
    const {
      className, user, links,
    } = this.props;
    return (
      <div className={className} ref={this.sidebarWrapper}>
        {user}
        {links}
      </div>
    );
  }
}

SidebarWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired,
};

class Sidebar extends React.Component {
  mainPanel = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true,
    };
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => (window.location.href.indexOf(routeName) > -1 ? 'active' : '');

  openCollapse = (collapse) => {
    const st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = (routes) => {
    const { classes, color } = this.props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        const st = {};
        st[prop.state] = !this.state[prop.state];
        const navLinkClasses = classes.itemLink;
        const itemText = cx(classes.itemText, {
          [classes.itemTextMini]:
            this.props.miniActive && this.state.miniActive,
        });
        const collapseItemText = cx(classes.collapseItemText, {
          [classes.collapseItemTextMini]:
            this.props.miniActive && this.state.miniActive,
        });
        const { itemIcon } = classes;
        const { caret } = classes;
        const { collapseItemMini } = classes;
        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined },
            )}
          >
            <NavLink
              to="#"
              className={navLinkClasses}
              onClick={(e) => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === 'string' ? (
                  <Icon className={itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={itemIcon} />
                )
              ) : (
                <span className={collapseItemMini}>
                  {prop.mini}
                </span>
              )}
              <ListItemText
                primary={prop.name}
                secondary={
                  <b className={cx(caret, classes.caretActive)} />
                }
                disableTypography
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined },
                )}
              />
            </NavLink>
            <Collapse in unmountOnExit>
              <List className={cx(classes.list, classes.collapseList)}>
                {this.createLinks(prop.subItems)}
              </List>
            </Collapse>
          </ListItem>
        );
      }
      const innerNavLinkClasses = `${classes.collapseItemLink
      } ${
        cx({
          [` ${classes[color]}`]: this.activeRoute(prop.path),
        })}`;
      const { collapseItemMini } = classes;
      const navLinkClasses = `${classes.itemLink
      } ${
        cx({
          [` ${classes[color]}`]: this.activeRoute(prop.path),
        })}`;
      const itemText = cx(classes.itemText, {
        [classes.itemTextMini]:
          this.props.miniActive && this.state.miniActive,
      });
      const collapseItemText = cx(classes.collapseItemText, {
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive,
      });
      const { itemIcon } = classes;
      return (
        <ListItem
          key={key}
          className={cx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined },
          )}
        >
          <NavLink
            to={prop.path}
            className={cx(
              { [navLinkClasses]: prop.icon !== undefined },
              { [innerNavLinkClasses]: prop.icon === undefined },
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === 'string' ? (
                <Icon className={itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={itemIcon} />
              )
            ) : (
              <span className={collapseItemMini}>
                {prop.mini}
              </span>
            )}
            <ListItemText
              primary={prop.name}
              disableTypography
              className={cx(
                { [itemText]: prop.icon !== undefined },
                { [collapseItemText]: prop.icon === undefined },
              )}
            />
          </NavLink>
        </ListItem>
      );
    });
  };

  render() {
    const {
      classes,
      logo,
      logoText,
      bgColor,
    } = this.props;
    const user = (
      <User
        bgColor={bgColor}
        openAvatar={this.state.openAvatar}
        openCollapse={this.openCollapse}
        miniActive={this.props.miniActive && this.state.miniActive}
      />
    );
    const links = (
      <List className={classes.list}>{this.createLinks(menus)}</List>
    );

    const logoNormal = cx(classes.logoNormal, {
      [classes.logoNormalSidebarMini]:
        this.props.miniActive && this.state.miniActive,
    });
    const { logoMini } = classes;
    const logoClasses = cx(classes.logo, {
      [classes.whiteAfter]: bgColor === 'white',
    });
    const brand = (
      <div className={logoClasses}>
        <a
          href="#"
          className={logoMini}
        >
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a
          href="#"
          className={logoNormal}
        >
          {logoText}
        </a>
      </div>
    );
    const drawerPaper = cx(classes.drawerPaper, {
      [classes.drawerPaperMini]:
        this.props.miniActive && this.state.miniActive,
    });
    const sidebarWrapper = cx(classes.sidebarWrapper, {
      [classes.drawerPaperMini]:
        this.props.miniActive && this.state.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1,
    });
    return (
      <div ref={this.mainPanel}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: 'blue',
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  color: PropTypes.oneOf([
    'white',
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'rose',
  ]).isRequired,
  logo: PropTypes.string.isRequired,
  logoText: PropTypes.string.isRequired,
  miniActive: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
