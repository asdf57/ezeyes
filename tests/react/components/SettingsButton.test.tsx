import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SettingsButton from '../../../src/react/components/SettingsButton';
import { useMenuManager } from '../../../src/react/hooks/useMenuManager';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { MenuType } from  '../../../src/react/contexts/MenuManagerContext';

// Correctly mock the useMenuManager hook
jest.mock('../../../src/react/hooks/useMenuManager');

describe('SettingsButton component', () => {
  it('calls openMenu with MenuType.SETTINGS when clicked', () => {
    // Mock the implementation of the useMenuManager hook
    const openMenuMock = jest.fn();
    (useMenuManager as jest.Mock).mockReturnValue({ openMenu: openMenuMock });

    render(<SettingsButton />);
    const button = screen.getByRole('button');

    // Simulate user clicking the button
    fireEvent.click(button);

    // Assert that openMenu was called with the correct argument
    expect(openMenuMock).toHaveBeenCalledWith(MenuType.SETTINGS);
  });
});
