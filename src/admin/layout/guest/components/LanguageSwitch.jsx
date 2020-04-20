import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiButtonEmpty,
  EuiPopover,
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '@elastic/eui';
import { useTranslation } from 'react-i18next';
import LanguageSwitchContainer from '../../../../common/i18n/containers/LanguageSwitchContainer';
import styles from '../styles.m.scss';

function Render({
  onButtonClick,
  isPopoverOpen,
  closePopover,
  panels,
  language,
}) {
  const { t } = useTranslation();
  const items = panels[0].items.map((item) => (
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
          {t(`common:lang-${language}`)}
        </EuiButtonEmpty>
      )}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      withTitle
      anchorPosition="downLeft"
      className={styles.languageSwitch}
    >
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  );
}

Render.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  isPopoverOpen: PropTypes.bool.isRequired,
  closePopover: PropTypes.func.isRequired,
  panels: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

export default function LanguageSwitch() {
  return (
    <LanguageSwitchContainer>
      {Render}
    </LanguageSwitchContainer>
  );
}
