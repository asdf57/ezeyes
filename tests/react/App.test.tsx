import React from 'react';
import { render } from '@testing-library/react';
import App from '../../src/react/App';

describe('App component', () => {
  it('finds the panel viewport', () => {
    const { container } = render(<App />);
    const divElement = container.querySelector('#panel-viewport');
    expect(divElement).toBeInTheDocument();
  });
});
