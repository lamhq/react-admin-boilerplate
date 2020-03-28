import React from 'react';
import useAlert from '../hooks/useAlert';
import EuiAlert from '../../../eui/components/Alert';

export default function Alert() {
  const { alert, closeAlert } = useAlert();

  React.useEffect(() => {
    if (alert) {
      setTimeout(closeAlert, 3000);
    }
  }, [alert]);

  if (!alert) return null;
  const { type, message } = alert;
  return (
    <EuiAlert type={type} message={message} />
  );
}
