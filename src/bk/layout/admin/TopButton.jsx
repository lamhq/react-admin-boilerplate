import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function TopButton({ onClick }) {
  const classes = useStyles();

  return (
    <Fab
      size="small"
      className={classes.button}
      color="inherit"
      onClick={onClick}
    >
      <UpIcon />
    </Fab>
  );
}

TopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
