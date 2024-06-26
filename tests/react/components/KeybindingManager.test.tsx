import React from 'react';
import { render } from '@testing-library/react';
import KeybindingManager from '../../../src/react/components/KeybindingManager';

jest.mock('../../../src/react/hooks/useKeybindings', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('KeybindingManager component', () => {
  it('calls useKeybindings hook', () => {
    render(<KeybindingManager />);
    const useKeybindings = require('../../../src/react/hooks/useKeybindings').default;
    expect(useKeybindings).toHaveBeenCalled();
  });
});
