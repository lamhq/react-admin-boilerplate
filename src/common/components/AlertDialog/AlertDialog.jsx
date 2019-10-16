/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import styles from './styles';

const useStyles = makeStyles(styles);

export default function AlertDialog(props) {
  const {
    onConfirm,
    onCancel,
    type,
    title,
    children,
    showCancel,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonText,
    cancelButtonColor,
  } = props;
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  function handleConfirm() {
    setOpen(false);
    onConfirm && onConfirm();
  }

  function handleCancel() {
    setOpen(false);
    onCancel && onCancel();
  }

  let icon;
  switch (type) {
    case 'error':
      icon = (
        <div className={cx(classes.icon, classes.error)}>
          <div className={classes.errXMark}>
            <div className={classes.errXLineLeft} />
            <div className={classes.errXLineRight} />
          </div>
        </div>
      );
      break;

    case 'success':
      icon = (
        <div className={cx(classes.icon, classes.success)}>
          <span className={classes.succLineTip} />
          <span className={classes.succLineLong} />
        </div>
      );
      break;

    case 'warning':
      icon = (<div className={cx(classes.icon, classes.warning)} />);
      break;

    default:
      icon = undefined;
      break;
  }

  function getBtnClass(color) {
    let colorClass;
    switch (color) {
      case 'primary':
        colorClass = classes.primary;
        break;

      case 'info':
        colorClass = classes.info;
        break;

      case 'success':
        colorClass = classes.success;
        break;

      case 'warning':
        colorClass = classes.warning;
        break;

      case 'danger':
        colorClass = classes.danger;
        break;

      case 'rose':
        colorClass = classes.rose;
        break;

      case 'white':
        colorClass = classes.white;
        break;

      default:
        colorClass = '';
        break;
    }
    return cx(classes.button, colorClass);
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent className={classes.content}>
        {icon}
        <h2 className={classes.title}>{title}</h2>
        {children}
      </DialogContent>
      <DialogActions className={classes.center}>
        <Button onClick={handleConfirm} className={getBtnClass(confirmButtonColor)}>
          {confirmButtonText}
        </Button>
        {showCancel && (
          <>
            &nbsp;
            <Button onClick={handleCancel} className={getBtnClass(cancelButtonColor)} autoFocus>
              {cancelButtonText}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  type: PropTypes.oneOf([
    'error',
    'success',
    'warning',
  ]),
  title: PropTypes.node,
  showCancel: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  confirmButtonColor: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
  ]),
  cancelButtonText: PropTypes.string,
  cancelButtonColor: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
  ]),
  children: PropTypes.node,
};

AlertDialog.defaultProps = {
  onConfirm: undefined,
  onCancel: undefined,
  type: undefined,
  title: undefined,
  children: undefined,
  showCancel: false,
  confirmButtonText: 'Ok',
  confirmButtonColor: undefined,
  cancelButtonText: 'Cancel',
  cancelButtonColor: undefined,
};
