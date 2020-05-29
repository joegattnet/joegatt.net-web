import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { TAB } from '../variables';
import { ArrowRight } from 'styled-icons/typicons';

const Li = styled.li`
  display: inline-block;
  margin-right: ${TAB};
  text-transform: lowercase;
`;

const Arrow = styled(ArrowRight).attrs({ size: '24px' })`
  cursor: pointer;
  vertical-align: text-top;
`;

const Breadcrumb = ({ data: 
  {href,
  isLink,
  label,
}}) => (
  <Li>
    {isLink ? <a href={href}><Arrow />{label}</a> : <span><Arrow />{label}</span>}
  </Li>
);

export default Breadcrumb;
