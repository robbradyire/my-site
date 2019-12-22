import { createGlobalStyle } from 'styled-components';
import { Colour } from '../theme/colour';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: ornkey;
    src: local('ornkey'), url('../assets/ornkey.tff') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: ${Colour.beige};
    color: ${Colour.dark};
    font-family: ornkey;
    font-size: 20px;
    margin: 24px;
    padding: 0;
  }
`;

export default GlobalStyle;
