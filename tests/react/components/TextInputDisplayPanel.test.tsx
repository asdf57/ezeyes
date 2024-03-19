import React from 'react';
import TextInputDisplayPanel from '../../../src/react/components/TextInputDisplayPanel';
import { render, screen } from '@testing-library/react';
import { PanelContext } from '../../../src/react/contexts/PanelContext';

const mockContext = (textContent: string) => ({
    textContent,
    setTextContent: jest.fn(),
    isPlaying: false,
    setIsPlaying: jest.fn(),
    curWordSequence: Array<string>(),
    setCurWordSequence: jest.fn(),
});

describe('TextInputDisplayPanel', () => {
  it('displays the provided text content', () => {
    const testTextContent = 'Sample text content';
    render(
      <PanelContext.Provider value={mockContext(testTextContent)}>
        <TextInputDisplayPanel />
      </PanelContext.Provider>
    );

    expect(screen.getByText('Sample text content')).toBeInTheDocument();
  });

  it('handles empty text content by ensuring the text element is empty', () => {
    const { container } = render(
      <PanelContext.Provider value={mockContext('')}>
        <TextInputDisplayPanel />
      </PanelContext.Provider>
    );

    const textElement = container.querySelector('.text');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('');
  });
});
