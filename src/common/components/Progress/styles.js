const styles = {
  '@keyframes stretchdelay': {
    '0%, 40%, 100%': {
      transform: 'scaleY(0.4)',
    },
    '20%': {
      transform: 'scaleY(1.0)',
    },
  },
  spinner: {
    width: 50,
    height: 30,
    textAlign: 'center',
    fontSize: 10,
    verticalAlign: 'middle',
    display: 'inline-block',
    '& > div': {
      backgroundColor: '#e7e7e9',
      height: '100%',
      width: 5,
      display: 'inline-block',
      margin: '0 2px 0 0',
      animation: '$stretchdelay 1.2s infinite ease-in-out',
    },
    '& > .rect2': {
      animationDelay: '-1.1s',
    },
    '& > .rect3': {
      animationDelay: '-1.0s',
    },
    '& > .rect4': {
      animationDelay: '-0.9s',
    },
    '& > .rect5': {
      animationDelay: '-0.8s',
    },
  },
};

export default styles;
