import React, { PropTypes } from "react";
import styled from "styled-components";
import { GRAY, TAB_WIDTH } from "../variables";
import ArrowLink from "./ArrowLink";

const Li = styled.li`
  display: inline-block;
  margin-right: ${TAB_WIDTH};
  text-transform: lowercase;
`;

const Faint = styled.span`
  color: ${GRAY};
  margin-right: ${TAB_WIDTH};
  text-transform: lowercase;
`;

const Breadcrumb = ({ data: { href, isLink, label, role } }) => (
  <Li>
    <ArrowLink href={isLink && href}>{label}</ArrowLink>
    {role > 0 && <Faint title={`Restricted to {role}`}>Restricted</Faint>}
  </Li>
);

export default Breadcrumb;
