import React from 'react';
import {
  EuiContextMenu,
  EuiIcon,
  EuiPopover,
  EuiHeaderSectionItemButton,
} from '@elastic/eui';
import { useTranslation } from '../../../../common/hooks';
import LanguageSwitchContainer from '../../../../common/language';

export default function LanguageSwitch() {
  const { t } = useTranslation();

  return (
    <LanguageSwitchContainer>
      {({
        onButtonClick, isPopoverOpen, closePopover, panels,
      }) => (
        <EuiPopover
          button={(
            <EuiHeaderSectionItemButton onClick={onButtonClick}>
              <EuiIcon type="flag" size="m" title={t('common/language')} />
            </EuiHeaderSectionItemButton>
          )}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none"
          withTitle
          anchorPosition="downLeft"
        >
          <EuiContextMenu initialPanelId={0} panels={panels} />
        </EuiPopover>
      )}
    </LanguageSwitchContainer>
  );
}
