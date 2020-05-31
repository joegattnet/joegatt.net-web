import React, { PropTypes } from "react";
import styled from "styled-components";
import { TAB_WIDTH } from "../variables";
import ArrowLink from "./ArrowLink";

const Li = styled.li`
  display: inline-block;
  margin-right: ${TAB_WIDTH};
  text-transform: lowercase;
`;

const Breadcrumb = ({ data: { href, isLink, label } }) => (
  <Li>
    <ArrowLink href={isLink && href}>{label}</ArrowLink>
  </Li>
);

export default Breadcrumb;
