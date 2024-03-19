import React from 'react';
import { render } from '@testing-library/react';
import FocusManager from '../../../src/react/components/FocusManager';

jest.mock('../../../src/react/hooks/useFocusManager', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('FocusManager component', () => {
  it('calls useFocusManager hook', () => {
    render(<FocusManager />);
    const useFocusManager = require('../../../src/react/hooks/useFocusManager').default;
    expect(useFocusManager).toHaveBeenCalled();
  });
});
