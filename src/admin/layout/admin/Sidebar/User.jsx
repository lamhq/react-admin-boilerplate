import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';

import sidebarStyle from './sidebarStyle';
import LogoutBtn from './LogoutBtn';
import { useIdentity } from '../../../../common/state';

const useStyles = makeStyles(sidebarStyle);

export default function User({
  bgColor, openAvatar, openCollapse, miniActive,
}) {
  const classes = useStyles();
  const userWrapperClass = cx(classes.user, {
    [classes.whiteAfter]: bgColor === 'white',
  });
  const itemText = cx(classes.itemText, {
    [classes.itemTextMini]: miniActive,
  });
  const { caret } = classes;
  const collapseItemText = cx(classes.collapseItemText, {
    [classes.collapseItemTextMini]: miniActive,
  });
  const identity = useIdentity();
  return (
    <div className={userWrapperClass}>
      <List className={classes.list}>
        <ListItem className={cx(classes.item, classes.userItem)}>
          <NavLink
            to="#"
            className={cx(classes.itemLink, classes.userCollapseButton)}
            onClick={() => openCollapse('openAvatar')}
          >
            <ListItemText
              primary={identity.user.displayName}
              secondary={(
                <b
                  className={cx(caret, classes.userCaret, openAvatar ? classes.caretActive : '')}
                />
              )}
              disableTypography
              className={cx(itemText, classes.userItemText)}
            />
          </NavLink>
          <Collapse in={openAvatar} unmountOnExit>
            <List className={`${classes.list} ${classes.collapseList}`}>
              <ListItem className={classes.collapseItem}>
                <NavLink
                  to="/admin/profile"
                  className={cx(classes.itemLink, classes.userCollapseLinks)}
                >
                  <span className={classes.collapseItemMini}>P</span>
                  <ListItemText
                    primary="Profile"
                    disableTypography
                    className={collapseItemText}
                  />
                </NavLink>
              </ListItem>
              <ListItem className={classes.collapseItem}>
                <LogoutBtn>
                  <span className={classes.collapseItemMini}>L</span>
                  <ListItemText
                    primary="Logout"
                    disableTypography
                    className={collapseItemText}
                  />
                </LogoutBtn>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </div>
  );
}

User.propTypes = {
  bgColor: PropTypes.string.isRequired,
  openAvatar: PropTypes.bool.isRequired,
  openCollapse: PropTypes.func.isRequired,
  miniActive: PropTypes.bool.isRequired,
};

User.defaultProps = {
};
