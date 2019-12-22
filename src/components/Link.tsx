import React from 'react';

const Link: React.FC<React.ComponentPropsWithoutRef<'a'>> = ({
  children,
  ...rest
}) => <a {...rest}>{children}</a>;

Link.defaultProps = {
  target: '_blank',
  rel: 'noreferrer noopener',
};

export default Link;
