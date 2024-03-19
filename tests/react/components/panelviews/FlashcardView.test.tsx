import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FlashcardView from '../../../../src/react/components/panelviews/FlashcardView';

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

describe('FlashcardView', () => {
  it('renders without crashing', () => {
    render(<FlashcardView />);
    expect(screen.getByTestId('textInputDisplayPanel')).toBeInTheDocument();
    expect(screen.getByTestId('readerDisplayPanel')).toBeInTheDocument();
  });

  it('initially does not have the "flipped" class applied', () => {
    const { container } = render(<FlashcardView />);
    expect(container.firstChild).not.toHaveClass('flipped');
  });

  it('applies "flipped" class when clicked', () => {
    const { container } = render(<FlashcardView />);
    fireEvent.click(container.firstChild!);
    expect(container.firstChild).toHaveClass('flipped');
  });
});
