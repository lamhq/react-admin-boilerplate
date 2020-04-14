import React from 'react';
import PropTypes from 'prop-types';
import { EuiConfirmModal, EuiOverlayMask } from '@elastic/eui';
import DialogContext from '../contexts/dialog';
import { useTranslation } from 'react-i18next';

function getButtonColor(type) {
  let color;
  switch (type) {
    case 'error':
      color = 'danger';
      break;

    case 'success':
      color = 'primary';
      break;

    case 'warning':
      color = 'warning';
      break;

    default:
      color = 'secondary';
      break;
  }
  return color;
}

export default function DialogProvider({ children }) {
  const { t } = useTranslation();
  const [dialog, setDialog] = React.useState(null);

  function showConfirmDialog(title, content, options = {}) {
    const settings = {
      type: '',
      confirmButtonText: t('common:confirm-button'),
      cancelButtonText: t('common:cancel-button'),
      title,
      content,
      ...options,
    };

    return new Promise((resolve) => {
      function handleConfirm() {
        setDialog(null);
        resolve(true);
      }

      function handleCancel() {
        setDialog(null);
        resolve(false);
      }

      setDialog((
        <EuiOverlayMask>
          <EuiConfirmModal
            title={settings.title}
            cancelButtonText={settings.cancelButtonText}
            confirmButtonText={settings.confirmButtonText}
            buttonColor={getButtonColor(settings.type)}
            defaultFocusedButton="confirm"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          >
            <div>{settings.content}</div>
          </EuiConfirmModal>
        </EuiOverlayMask>
      ));
    });
  }

  return (
    <>
      {dialog}
      <DialogContext.Provider value={showConfirmDialog}>
        {children}
      </DialogContext.Provider>
    </>
  );
}

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
