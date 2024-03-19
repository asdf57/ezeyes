import React, { createContext, useState } from 'react';
import { Settings, initialSettings } from '../SettingsSchema';

interface SettingsContextType {
  settings: Settings;
  showSettingsMenu: boolean;
  setShowSettingsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: localStorage.getItem("settings")?JSON.parse(localStorage.getItem("settings")):initialSettings,
  showSettingsMenu: false,
  setShowSettingsMenu: () => {},
  setSettings: () => {}
});

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, showSettingsMenu, setShowSettingsMenu }}>
      {children}
    </SettingsContext.Provider>
  );
};
