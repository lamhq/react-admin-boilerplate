import React from 'react';
import {
  EuiButtonEmpty,
  EuiPopover,
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '@elastic/eui';
import { useTranslation } from '../../../../common/hooks';
import LanguageSwitchContainer from '../../../../common/language';

function Render({
  onButtonClick,
  isPopoverOpen,
  closePopover,
  panels,
  language,
}) {
  const { t } = useTranslation();
  const items = panels[0].items.map(item => (
    <EuiContextMenuItem
      key={item.name}
      icon={item.icon}
      onClick={item.onClick}
    >
      {item.name}
    </EuiContextMenuItem>
  ));
  return (
    <EuiPopover
      button={(
        <EuiButtonEmpty
          size="s"
          iconType="arrowDown"
          iconSide="right"
          onClick={onButtonClick}
        >
          {t(`common/lang-${language}`)}
        </EuiButtonEmpty>
      )}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      withTitle
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  );
}

export default function LanguageSwitch() {
  return (
    <LanguageSwitchContainer>
      {Render}
    </LanguageSwitchContainer>
  );
}
