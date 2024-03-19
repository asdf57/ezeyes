import '@testing-library/jest-dom';
import React from 'react';
import ReaderDisplay from '../../../src/react/components/ReaderDisplayPanel';
import { render } from '@testing-library/react';
import { PanelContext } from '../../../src/react/contexts/PanelContext';
import { screen } from '@testing-library/react';

const mockContext = (curWordSequence: string[]) => ({
  curWordSequence,
  setCurWordSequence: jest.fn(),
  textContent: '',
  setTextContent: jest.fn(),
  isPlaying: false,
  setIsPlaying: jest.fn(),
});

describe('ReaderDisplay', () => {
  it('renders the current word sequence', () => {
    const testWordSequence = ['Hello', 'World'];
    render(
      <PanelContext.Provider value={mockContext(testWordSequence)}>
        <ReaderDisplay />
      </PanelContext.Provider>
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles an empty word sequence by ensuring the text element is empty', () => {
    const { container } = render(
      <PanelContext.Provider value={mockContext([])}>
        <ReaderDisplay />
      </PanelContext.Provider>
    );

    const textElement = container.querySelector('.text');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('');
  });
});
