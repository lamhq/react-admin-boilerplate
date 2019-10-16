const styles = {
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  spinner: {
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,.2)',
    borderTopColor: 'rgba(0,0,0,.5)',
    borderRadius: '50%',
    animation: '$rotation 0.8s linear infinite',
  },
};

export default styles;
