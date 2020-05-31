import React from "react";
import styled from "styled-components";
import Breadcrumb from "./Breadcrumb";

import {
  CONTENT_COLUMNS_START,
  CONTENT_COLUMNS_SPAN,
  RED,
  LINE_HEIGHT,
  LINE_HEIGHT_2,
  LINE_HEIGHT_3,
  LINE_HEIGHT_5,
} from "../variables";

const StyledHeader = styled.header`
  grid-column-start: ${CONTENT_COLUMNS_START};
  grid-column-end: span ${CONTENT_COLUMNS_SPAN};
  margin: ${LINE_HEIGHT} 0;
  min-height: ${LINE_HEIGHT_5}px;
  h1 {
    color: ${RED};
    font-size: 32px;
    font-weight: 600;
    line-height: ${LINE_HEIGHT_3}px;
  }
  h2 {
    line-height: ${LINE_HEIGHT_2}px;
  }
`;

const StyledNav = styled.nav`
  grid-column-start: ${CONTENT_COLUMNS_START};
  grid-column-end: span ${CONTENT_COLUMNS_SPAN};
`;

export default ({ headline, subheadline, breadcrumbs }) => (
  <StyledHeader>
    <StyledNav>
      <ul>
        <Breadcrumb data={{ href: "/", isLink: true, label: "Home" }} />
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) => <Breadcrumb data={breadcrumb} />)}
      </ul>
    </StyledNav>
    <h1 dangerouslySetInnerHTML={{ __html: headline }} />
    {subheadline && <h2 dangerouslySetInnerHTML={{ __html: subheadline }} />}
  </StyledHeader>
);
