import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum MenuType {
    SETTINGS = 1,
    HELP = 2
};

/**
 * No tests needed!
 */

export interface MenuManagerContextType {
    currentMenu: MenuType | undefined;
    setCurrentMenu: React.Dispatch<React.SetStateAction<MenuType>>;
}

const defaultContextValue: MenuManagerContextType = {
    currentMenu: undefined,
    setCurrentMenu: () => {}
};

export const MenuManagerContext = createContext<MenuManagerContextType>(defaultContextValue);

export const MenuManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentMenu, setCurrentMenu] = useState<MenuType>(defaultContextValue.currentMenu);

    return (
        <MenuManagerContext.Provider value={{ currentMenu, setCurrentMenu }}>
            {children}
        </MenuManagerContext.Provider>
    );
};
