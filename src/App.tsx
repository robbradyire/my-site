import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Logo src={logo} alt="logo" />
      <p>This is my website.</p>
      <p>Quite thrilling.</p>
    </AppContainer>
  );
};

export default App;
