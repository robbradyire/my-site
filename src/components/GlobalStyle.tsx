import { createGlobalStyle } from 'styled-components';
import { Colour } from '../theme/colour';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ornkey';
    src: url('../assets/ornkey.regular.otf') format('opentype'),
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: ${Colour.beige};
    color: ${Colour.dark};
    font-family: Ornkey;
    font-size: 20px;
    margin: 24px;
    padding: 0;
  }
`;

export default GlobalStyle;
