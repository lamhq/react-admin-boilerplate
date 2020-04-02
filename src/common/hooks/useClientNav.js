import { useHistory } from 'react-router-dom';

export default function useClientNav() {
  const history = useHistory();

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

  return {
    getLinkProps,
    redirect,
  };
}
