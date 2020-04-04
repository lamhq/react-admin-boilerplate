import React from 'react';
import PropTypes from 'prop-types';
import { EuiConfirmModal, EuiOverlayMask } from '@elastic/eui';
import DialogContext from '../contexts/dialog';
import { useTranslation } from '../../hooks';

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
  const [isOpen, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [settings, setSettings] = React.useState({
    title: '',
    content: '',
    type: '',
    confirmButtonText: 'common/confirm-button',
    cancelButtonText: 'common/cancel-button',
  });
  let resolve = null;

  function showConfirmDialog(title, content, options = {}) {
    setSettings({
      ...settings,
      ...options,
      title,
      content,
    });
    setOpen(true);
    return new Promise((rs) => { resolve = rs; });
  }

  function handleConfirm() {
    setOpen(false);
    resolve(true);
  }

  function handleCancel() {
    setOpen(false);
    resolve(false);
  }

  return (
    <>
      {isOpen && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title={t(settings.title)}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            cancelButtonText={t(settings.cancelButtonText)}
            confirmButtonText={t(settings.confirmButtonText)}
            buttonColor={getButtonColor(settings.type)}
            defaultFocusedButton="confirm"
          >
            <div>{t(settings.content)}</div>
          </EuiConfirmModal>
        </EuiOverlayMask>
      )}
      <DialogContext.Provider value={showConfirmDialog}>
        {children}
      </DialogContext.Provider>
    </>
  );
}

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
