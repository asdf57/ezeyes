import { useReducer } from 'react';
import { PanelDisplayType, Settings, Keybindings, Panels, initialSettings } from '../SettingsSchema';

type SettingsAction = 
  | { type: 'LOAD_SETTINGS'; payload: Settings }
  | { type: 'CHANGE_PANEL_TYPE'; panelType: PanelDisplayType }
  | { type: 'CHANGE_KEYBINDING'; key: keyof Keybindings; value: string }
  | { type: 'CHANGE_PANEL_SETTING'; key: keyof Panels; value: any };

export function settingsReducer(state: Settings, action: SettingsAction): Settings {
  switch (action.type) {
    case 'LOAD_SETTINGS':
      return action.payload;
    case 'CHANGE_PANEL_TYPE':
      return { ...state, panels: { ...state.panels, displayType: action.panelType } };
    case 'CHANGE_KEYBINDING':
      return { ...state, keybindings: { ...state.keybindings, [action.key]: action.value } };
    case 'CHANGE_PANEL_SETTING':
      return { ...state, panels: { ...state.panels, [action.key]: action.value } };
    default:
      return state;
  }
}

function validatePanelType(panelType: PanelDisplayType): boolean {
  return Object.values(PanelDisplayType).includes(panelType);
}

function validateKeybinding(key: keyof Keybindings, value: string): boolean {
  const validKeys = Object.keys(initialSettings.keybindings);
  return validKeys.includes(key) && typeof value === 'string';
}

function validatePanelSetting(key: keyof Panels, value: any): boolean {
  const validKeys = Object.keys(initialSettings.panels);
  return validKeys.includes(key);
}

export const useSettings = () => {
  const dispatch = useReducer(settingsReducer, initialSettings)[1];

  const changePanelType = (panelType: PanelDisplayType): void => {
    if (validatePanelType(panelType)) {
      dispatch({ type: 'CHANGE_PANEL_TYPE', panelType });
    } else {
      throw new Error('Invalid panel type');
    }
  };

  const changeKeybinding = (key: keyof Keybindings, value: string): void => {
    if (validateKeybinding(key, value)) {
      dispatch({ type: 'CHANGE_KEYBINDING', key, value });
    } else {
      throw new Error('Invalid keybinding');
    }
  };

  const changePanelSetting = (key: keyof Panels, value: any): void => {
    if (validatePanelSetting(key, value)) {
      dispatch({ type: 'CHANGE_PANEL_SETTING', key, value });
    } else {
      throw new Error('Invalid panel setting');
    }
  };

  return { changePanelType, changeKeybinding, changePanelSetting };
};
