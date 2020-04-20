import React from 'react';
import { useConfig } from '../config';

export default function useDocumentTitle(title) {
  const { appName } = useConfig();
  React.useEffect(() => {
    if (title) {
      document.title = `${title} - ${appName}`;
    }
  }, [title]);
}
