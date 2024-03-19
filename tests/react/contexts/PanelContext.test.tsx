import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, act, screen } from '@testing-library/react';
import { PanelProvider, PanelContext } from '../../../src/react/contexts/PanelContext';

const TestPanelContextComponent = () => {
  const { curWordSequence, setCurWordSequence, textContent, setTextContent, isPlaying, setIsPlaying } = useContext(PanelContext);

  return (
    <div>
      <div data-testid="curWordSequence">{curWordSequence}</div>
      <div data-testid="textContent">{textContent}</div>
      <div data-testid="isPlaying">{isPlaying.toString()}</div>
      {/* <button onClick={() => setCurWordSequence(['test', 'sequence'])}>Update Sequence</button> */}
      <button onClick={() => setTextContent('Updated text content')}>Update Text</button>
      <button onClick={() => setIsPlaying(!isPlaying)}>Toggle Playing</button>
    </div>
  );
};

describe('PanelProvider', () => {
  test('renders children and provides default context values', () => {
    render(
      <PanelProvider>
        <TestPanelContextComponent />
      </PanelProvider>
    );

    expect(screen.getByTestId('curWordSequence')).toHaveTextContent('');
    expect(screen.getByTestId('textContent')).not.toHaveTextContent('');
    expect(screen.getByTestId('isPlaying')).toHaveTextContent('false');
  });

  test('updates context values correctly', () => {
    render(
      <PanelProvider>
        <TestPanelContextComponent />
      </PanelProvider>
    );

    act(() => {
      screen.getByText('Update Sequence').click();
      screen.getByText('Update Text').click();
      screen.getByText('Toggle Playing').click();
    });

    expect(screen.getByTestId('curWordSequence')).toHaveTextContent('test,sequence');
    expect(screen.getByTestId('textContent')).toHaveTextContent('Updated text content');
    expect(screen.getByTestId('isPlaying')).toHaveTextContent('true');
  });
});
