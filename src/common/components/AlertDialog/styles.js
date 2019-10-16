import sweetAlertStyle from '../../../mdpr/assets/jss/material-dashboard-pro-react/views/sweetAlertStyle';

const errXLine = {
  display: 'block',
  position: 'absolute',
  top: '2.3125em',
  width: '2.9375em',
  height: '.3125em',
  borderRadius: '.125em',
  backgroundColor: '#f27474',
};

const successLine = {
  display: 'block',
  position: 'absolute',
  zIndex: '2',
  height: '.3125em',
  borderRadius: '.125em',
  backgroundColor: '#a5dc86',
};

const styles = {
  ...sweetAlertStyle,
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    position: 'relative',
    boxSizing: 'content-box',
    justifyContent: 'center',
    width: '5em',
    height: '5em',
    margin: '1.25em auto 1.875em',
    zoom: 'normal',
    border: '.25em solid transparent',
    borderRadius: '50%',
    fontFamily: 'inherit',
    lineHeight: '5em',
    cursor: 'default',
    userSelect: 'none',
    '&:before': {
      display: 'flex',
      alignItems: 'center',
      height: '92%',
      fontSize: '3.75em',
    },
  },
  warning: {
    borderColor: '#facea8 !important',
    color: '#f8bb86',
    '&:before': {
      content: '"!"',
    },
  },
  error: {
    borderColor: '#f27474',
  },
  errXMark: {
    position: 'relative',
    flexGrow: 1,
  },
  errXLineLeft: {
    ...errXLine,
    left: '1.0625em',
    transform: 'rotate(45deg)',
  },
  errXLineRight: {
    ...errXLine,
    right: '1em',
    transform: 'rotate(-45deg)',
  },
  success: {
    borderColor: '#a5dc86 !important',
  },
  succLineTip: {
    ...successLine,
    top: '2.875em',
    left: '.875em',
    width: '1.5625em',
    transform: 'rotate(45deg)',
  },
  succLineLong: {
    ...successLine,
    top: '2.375em',
    right: '.5em',
    width: '2.9375em',
    transform: 'rotate(-45deg)',
  },
};

export default styles;
