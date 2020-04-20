import React from 'react';
import { appName } from '../../params';

export default function useDocumentTitle(title) {
  React.useEffect(() => {
    if (title) {
      document.title = `${title} - ${appName}`;
    }
  }, [title]);
}
