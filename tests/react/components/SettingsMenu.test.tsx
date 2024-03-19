import '@testing-library/jest-dom';
import React from 'react';
import SettingsMenu from '../../../src/react/components/SettingsMenu';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { SettingsContext } from '../../../src/react/contexts/SettingsContext';
import { initialSettings } from '../../../src/react/SettingsSchema';
import { DialogContainer, Provider, defaultTheme } from '@adobe/react-spectrum';
import { MenuManagerContext, MenuManagerContextType } from '../../../src/react/contexts/MenuManagerContext';
import { useMenuManager } from '../../../src/react/hooks/useMenuManager';


const mockContext = () => ({
  settings: initialSettings,
  showSettingsMenu: false,
  setShowSettingsMenu: jest.fn(),
  setSettings: jest.fn(),
});

const mockMenuManagerContext: MenuManagerContextType = {
  currentMenu: undefined,
  setCurrentMenu: () => {}
};

function TestSettingsMenu() {
  const { closeMenu } = useMenuManager();

  return (
    <Provider theme={defaultTheme}>
      <MenuManagerContext.Provider value={mockMenuManagerContext}>
        <DialogContainer onDismiss={closeMenu}>
          <SettingsContext.Provider value={mockContext()}>
            <SettingsMenu onClose={closeMenu} />
          </SettingsContext.Provider>
        </DialogContainer>
      </MenuManagerContext.Provider>
    </Provider>
  );
}

describe('SettingsMenu', () => {
  it('renders the settings menu', () => {
    render(<TestSettingsMenu />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
