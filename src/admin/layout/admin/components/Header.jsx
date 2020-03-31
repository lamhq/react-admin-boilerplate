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
import UserMenu from '../containers/UserMenu';
import styles from '../styles.m.scss';

export default function Header({ toggleDrawer, breadcrumbs }) {
  return (
    <div className={styles.headerWrapper}>
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

        { breadcrumbs
          ? <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
          : <nav className="euiBreadcrumbs euiHeaderBreadcrumbs euiBreadcrumbs--truncate euiBreadcrumbs--responsive" />
        }

        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <UserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </div>
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
