import React, { PropTypes } from "react";
import styled from "styled-components";
import { TAB_WIDTH } from "../variables";

import { ArrowRight } from "styled-icons/typicons";

const Arrow = styled(ArrowRight).attrs({ size: "24x" })`
  cursor: pointer;
  vertical-align: text-top;
`;

const StyledArrowLink = styled.a`
  span {
    display: inline-block;
    width: ${TAB_WIDTH};
  }
`;

export default ({ href, className, id, children }) => (
  <StyledArrowLink href={href} className={className} id={id}>
    <span>
      <ArrowRight />
    </span>
    {children}
  </StyledArrowLink>
);
