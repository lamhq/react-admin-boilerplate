const headerBlockStyle = {
  display: 'flex',
  alignItems: 'center',
  height: 80,
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundColor: '#e50069',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#e7e7e9',
    paddingTop: '50px',
  },
  leftBlock: {
    ...headerBlockStyle,
    '& >*': {
      marginRight: 20,
    },
  },
  middleBlock: {
    ...headerBlockStyle,
    justifyContent: 'center',
  },
  rightBlock: {
    ...headerBlockStyle,
    justifyContent: 'flex-end',
    '& >*': {
      marginLeft: 40,
      color: '#fff',
    },
  },
  pageTitle: {
    color: '#fff',
    fontSize: 28,
    margin: 0,
  },
};

export default styles;
