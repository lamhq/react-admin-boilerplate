import React from 'react';
import PropTypes from 'prop-types';
import { EuiCallOut } from '@elastic/eui';
import { useTranslation } from '../../common/hooks';

export default function Alert({ type, message }) {
  const { t } = useTranslation();
  let color = 'success';
  let icon = 'checkInCircleFilled';
  switch (type) {
    case 'error':
      color = 'danger';
      icon = 'crossInACircleFilled';
      break;

    case 'success':
      color = 'success';
      icon = 'checkInCircleFilled';
      break;

    case 'warning':
      color = 'warning';
      icon = 'alert';
      break;

    default:
      break;
  }

  return (
    <EuiCallOut
      size="s"
      color={color}
      title={t(message)}
      iconType={icon}
      role="alert"
    />
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
