import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../hooks';
import LanguageSwitch from '../components/LanguageSwitch';

const allowedLanguages = ['en', 'vi'];

export default function LanguageSwitchContainer({ children: render }) {
  const [isPopoverOpen, setPopover] = React.useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  function onButtonClick() {
    setPopover(!isPopoverOpen);
  }

  function closePopover() {
    setPopover(false);
  }

  const panels = [{
    id: 0,
    title: t('common/select-language'),
    items: allowedLanguages.map(lang => ({
      name: t(`common/lang-${lang}`),
      icon: currentLanguage === lang ? 'check' : 'empty',
      onClick: () => {
        i18n.changeLanguage(lang);
        closePopover();
      },
    })),
  }];

  return render({
    isPopoverOpen,
    closePopover,
    onButtonClick,
    panels,
    language: currentLanguage,
  });
}

LanguageSwitch.propTypes = {
  children: PropTypes.func.isRequired,
};
