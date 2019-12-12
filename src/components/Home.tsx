import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const P = styled.p`
  font-size: 20px;
`;

const List = styled.ul`
  list-style-type: disclosure-closed;
`;

const links = [
  { name: 'GitHub', href: 'https://github.com/robbradyire/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rbrady1/' },
];

const Home: React.FC = () => (
  <React.Fragment>
    <h1>Robert Brady</h1>
    <P>That's my name.</P>
    <P>I'm still building this but here's some links:</P>
    <List>
      {links.map(({ name, href }) => (
        <li key={href}>
          <Link href={href}>{name}</Link>
        </li>
      ))}
    </List>
  </React.Fragment>
);
export default Home;
