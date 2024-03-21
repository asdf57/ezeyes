import { useReducer } from 'react';
import { PanelDisplayType, Settings, Keybindings, initialSettings } from '../SettingsSchema';

function validatePanelType(panelType: PanelDisplayType): boolean {
  return Object.values(PanelDisplayType).includes(panelType);
}

function validateKeybinding(key: keyof Keybindings, value: string): boolean {
  const validKeys = Object.keys(initialSettings.keybindings);
  return validKeys.includes(key) && typeof value === 'string';
}

// function validatePanelSetting(key: keyof Panels, value: any): boolean {
//   const validKeys = Object.keys(initialSettings.panels);
//   return validKeys.includes(key);
// }

export const useSettings = () => {
  
};
