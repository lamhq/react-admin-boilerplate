import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiConfirmModal,
  EuiOverlayMask,
} from '@elastic/eui';
import DialogContext from '../contexts/dialog';

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
  const [settings, setSettings] = React.useState({
    title: '',
    content: '',
    type: '',
    confirmButtonText: '',
    cancelButtonText: '',
  });
  let resolve = null;
  const promise = new Promise((rs) => { resolve = rs; });

  function showConfirmDialog(title, content, options = {}) {
    setSettings({
      ...settings,
      ...options,
      title,
      content,
    });
    setOpen(true);
    return promise;
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
            title={settings.title}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            cancelButtonText={settings.cancelButtonText}
            confirmButtonText={settings.confirmButtonText}
            buttonColor={getButtonColor(settings.type)}
            defaultFocusedButton="confirm"
          >
            {settings.content}
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
