import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HorizontalPanel from '../../../../src/react/components/panelviews/HorizontalPanel';

jest.mock('../../../../src/react/components/TextInputDisplayPanel', () => () => <div data-testid="textInputDisplayPanel">TextInputDisplayPanel Mock</div>);
jest.mock('../../../../src/react/components/ReaderDisplayPanel', () => () => <div data-testid="readerDisplayPanel">ReaderDisplayPanel Mock</div>);

describe('HorizontalPanel', () => {
  it('renders without crashing', () => {
    render(<HorizontalPanel />);
    expect(screen.getByTestId('textInputDisplayPanel')).toBeInTheDocument();
    expect(screen.getByTestId('readerDisplayPanel')).toBeInTheDocument();
  });
});
