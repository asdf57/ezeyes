import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZoomView from '../../../../src/react/components/panelviews/ZoomView';

jest.mock('../../../../src/react/components/TextInputDisplayPanel', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="textInputDisplayPanel">TextInputDisplayPanel Mock</div>,
  };
});

jest.mock('../../../../src/react/components/ReaderDisplayPanel', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="readerDisplayPanel">ReaderDisplayPanel Mock</div>,
  };
});

describe('ZoomView', () => {
  it('renders without crashing', () => {
    render(<ZoomView />);
    expect(screen.getByTestId('textInputDisplayPanel')).toBeInTheDocument();
    expect(screen.getByTestId('readerDisplayPanel')).toBeInTheDocument();
  });

  it('contains a div with id "zoom-container"', () => {
    const { container } = render(<ZoomView />);
    const zoomContainer = container.querySelector('#zoom-container');
    expect(zoomContainer).not.toBeNull();
    expect(zoomContainer).toContainElement(screen.getByTestId('textInputDisplayPanel'));
    expect(zoomContainer).toContainElement(screen.getByTestId('readerDisplayPanel'));
  });
});
