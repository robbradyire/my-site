import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders declaration', () => {
  const { getByText } = render(<App />);
  const elem = getByText(/This is my website./i);
  expect(elem).toBeInTheDocument();
});
