import React from 'react';

export default function usePermanentState(name) {
  const [value, setValue] = React.useState(() => {
    const str = window.localStorage.getItem(name);
    return str ? JSON.parse(str) : undefined;
  });

  React.useEffect(() => {
    if (value) {
      window.localStorage.setItem(name, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(name);
    }
  }, [value]);

  return [value, setValue];
}
