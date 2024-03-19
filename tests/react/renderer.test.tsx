import React from 'react';
import App from '../../src/react/App';

const mockRender = jest.fn();

jest.mock("react-dom/client", () => ({ 
  createRoot: jest.fn().mockImplementation(() => ({
    render: mockRender,
  }))
}));

describe('renderer.tsx', () => {
  beforeEach(() => {
    mockRender.mockClear();
    jest.resetModules();
  });

  it('renders the App component', () => {
    document.body.innerHTML = '<div id="root"></div>';
    require('../../src/react/renderer');

    const expectedElement = React.createElement(
      React.StrictMode, 
      {}, 
      React.createElement(App)
    );
    
    expect(mockRender).toHaveBeenCalled();
  });
});
