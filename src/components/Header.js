import React from 'react';
import styled from 'styled-components';
import Breadcrumb from './Breadcrumb';

import {
  CONTENT_COLUMNS_START,
  CONTENT_COLUMNS_SPAN,
  RED,
} from '../variables';

const StyledHeader = styled.header`
  grid-column-start: ${CONTENT_COLUMNS_START};
  grid-column-end: span ${CONTENT_COLUMNS_SPAN};
  h1 {
    color: ${RED};
    font-size: 32px;
    font-weight: 600;
  }
`;

const StyledNav = styled.nav`
  grid-column-start: ${CONTENT_COLUMNS_START};
  grid-column-end: span ${CONTENT_COLUMNS_SPAN};
`;

export default ({ headline, subheadline, breadcrumbs }) => (
  <StyledHeader>
    <StyledNav>
      <Breadcrumb data={{ href: '/', isLink: true, label: 'Home' }} />
      {breadcrumbs && breadcrumbs.map(breadcrumb => <Breadcrumb data={breadcrumb} />)}
    </StyledNav>
    <h1 dangerouslySetInnerHTML={{  __html: headline }} />
    {subheadline && <h2 dangerouslySetInnerHTML={{  __html: subheadline }} />}
  </StyledHeader>
);
