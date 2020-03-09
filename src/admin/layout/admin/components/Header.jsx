import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  EuiShowFor,
} from '@elastic/eui';

export default function Header({ toggleDrawer, breadcrumbs }) {
  return (
    <EuiHeader>
      <EuiHeaderSection grow={false}>
        <EuiShowFor sizes={['xs', 's']}>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderSectionItemButton
              aria-label="Open nav"
              onClick={toggleDrawer}
            >
              <EuiIcon type="apps" href="#" size="m" />
            </EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
        </EuiShowFor>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo
            iconType="logoKibana"
            href="/"
            aria-label="Goes to home"
          />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>

      { breadcrumbs ? <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} /> : null}
    </EuiHeader>
  );
}

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
  })),
};

Header.defaultProps = {
  breadcrumbs: null,
};
