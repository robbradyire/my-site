import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const List = styled.ul`
  list-style-type: disclosure-closed;
  line-height: 30px;
`;

const links = [
  { name: 'GitHub', href: 'https://github.com/robbradyire/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rbrady1/' },
  { name: 'Bingo!', href: '/bingo' },
];

const Home: React.FC = () => (
  <React.Fragment>
    <h1>Robert Brady</h1>
    <p>That's my name.</p>
    <p>I'm still building this but here's some links:</p>
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
