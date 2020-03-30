import { useHistory } from 'react-router-dom';

export default function useLink() {
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

  return getLinkProps;
}
