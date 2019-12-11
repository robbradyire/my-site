import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  font-size: 18px;
  line-height: 30px;
`;

const Link: React.FC<React.ComponentPropsWithoutRef<'a'>> = ({
  children,
  ...rest
}) => <StyledLink {...rest}>{children}</StyledLink>;

export default Link;
