import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiTitle,
} from '@elastic/eui';
import NavBar from './NavBar';
import Header from './Header';
import { appName } from '../../../../config';

export default function Page({ title, children, breadcrumbs }) {
  const navDrawerRef = React.useRef(null);

  function toggleDrawer() {
    navDrawerRef.current.toggleOpen();
  }

  React.useEffect(() => {
    if (title) {
      document.title = `${title} - ${appName}`;
    }
  }, [title]);

  return (
    <React.Fragment>
      <Header toggleDrawer={toggleDrawer} breadcrumbs={breadcrumbs} />
      <NavBar ref={navDrawerRef} />
      <EuiPage className="euiNavDrawerPage">
        <EuiPageBody className="euiNavDrawerPage__pageBody">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>{title}</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Content title</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              {children}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </React.Fragment>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
  })),
};

Page.defaultProps = {
  title: '',
  breadcrumbs: null,
};
