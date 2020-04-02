import { useHistory, useLocation } from 'react-router-dom';

export default function useNavigator() {
  const history = useHistory();
  const location = useLocation();

  function getLinkProps(href) {
    function onClick(e) {
      e.preventDefault();
      history.push(href);
    }

    return {
      href,
      onClick,
    };
  }

  function redirect(link) {
    // set a delay to prevent issue state update on an unmounted component
    setTimeout(() => history.push(link), 10);
  }

  function goBack() {
    const { from } = location.state || { from: { pathname: '/' } };
    redirect(from);
  }

  return {
    getLinkProps,
    redirect,
    goBack,
  };
}
