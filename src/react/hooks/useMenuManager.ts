import { useContext, useEffect, useState } from 'react';
import { MenuManagerContext, MenuType } from '../contexts/MenuManagerContext';
import Mousetrap from 'mousetrap';

export const useMenuManager = () => {
    const { currentMenu, setCurrentMenu } = useContext(MenuManagerContext);

    const openMenu = (menu: MenuType): void => {
        if (menu !== currentMenu) {
            closeMenu();
        }

        setCurrentMenu(menu);
    }

    const closeMenu = () => setCurrentMenu(undefined);

  return {
    openMenu,
    closeMenu
  };
};
