
import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MenuManager, renderModalContent } from '../../../src/react/components/MenuManager';
import { useMenuManager } from '../../../src/react/hooks/useMenuManager';
import { MenuManagerContext, MenuType } from '../../../src/react/contexts/MenuManagerContext';
import { Menu, Provider, defaultTheme } from '@adobe/react-spectrum';

const mockCloseMenu = jest.fn();

jest.mock('../../../src/react/hooks/useMenuManager', () => ({
  useMenuManager: jest.fn().mockReturnValue({
    closeMenu: jest.fn(),
  }),
}));

describe('MenuManager component', () => {
  it('calls useMenuManager hook', () => {
    render(<MenuManager />);
    expect(useMenuManager).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const { container } = render(<MenuManager />);
    expect(container).toBeTruthy();
  });
});


const TestMenuManager = (currentMenu: MenuType) => {
  return render(
    <Provider theme={defaultTheme}>
      <MenuManagerContext.Provider value={{
        currentMenu,
        setCurrentMenu: jest.fn(),
      }}>
      <MenuManager />
      </MenuManagerContext.Provider>
    </Provider>
  );
};

describe('renderModalContent', () => {
  it('renders SettingsMenu when currentMenu is SETTINGS', () => {
    TestMenuManager(MenuType.SETTINGS);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});