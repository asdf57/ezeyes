import React, { createContext, useReducer, useState } from 'react';
import { Keybindings, PanelDisplayType, Settings, ThemeType, UI, UISize, WPMType, WpmRange, WpmSettings, initialSettings } from '../SettingsSchema';
import { darkTheme, lightTheme } from "@adobe/react-spectrum";
import { parseColor } from '@react-stately/color';
import { Theme } from "@react-types/provider";

interface SettingsContextType {
  settings: Settings;
  showSettingsMenu: boolean;
  setShowSettingsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<Action>;
  getThemeObject: (theme: ThemeType) => Theme;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  showSettingsMenu: false,
  setShowSettingsMenu: () => {},
  dispatch: () => {},
  getThemeObject: () => lightTheme,
});

export const isValidKeybinding = (key: keyof Keybindings, value: string): boolean => {
  interface SpecialAliases {
    option: string;
    command: string;
    return: string;
    escape: string;
    plus: string;
    mod: string;
    [key: string]: string | boolean;
  }

  const _SPECIAL_ALIASES: SpecialAliases = {
    'option': 'alt',
    'command': 'meta',
    'return': 'enter',
    'escape': 'esc',
    'plus': '+',
    'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
  };

  var _KEYCODE_MAP = {
    106: '*',
    107: '+',
    109: '-',
    110: '.',
    111 : '/',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
};

const _MAP = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'ins',
  46: 'del',
  91: 'meta',
  93: 'meta',
  224: 'meta'
};

  var keys = value.split('+');
  var isValidKey = function(key: string) {
    var normalizedKey = _SPECIAL_ALIASES[key] as string || key;
    return Object.values(_MAP).includes(normalizedKey) ||
            Object.values(_KEYCODE_MAP).includes(normalizedKey) ||
            Object.values(_SPECIAL_ALIASES).includes(normalizedKey) ||
            (normalizedKey.length === 1 && normalizedKey.match(/[a-z0-9]/i));
  };

  return keys.every(isValidKey);
}

function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

type Action =
  | { type: 'UPDATE_WPM_TYPE'; value: WPMType }
  | { type: 'UPDATE_WPM_SETTING'; wpmType: 'assisted' | 'normal'; setting: 'min' | 'max' | 'current'; value: number }
  | { type: 'UPDATE_WORD_SEQUENCE_LENGTH'; value: number }
  | { type: 'UPDATE_UI_SIZE'; value: UISize }
  | { type: 'UPDATE_UI_THEME'; value: ThemeType }
  | { type: 'UPDATE_UI_DEFAULT_DISPLAY'; value: PanelDisplayType }
  | { type: 'UPDATE_UI_BLUR'; value: number }
  | { type: 'UPDATE_UI_BRIGHTNESS'; value: number }
  | { type: 'UPDATE_UI_CONTRAST'; value: number }
  | { type: 'UPDATE_UI_GRAYSCALE'; value: number }
  | { type: 'UPDATE_UI_HUE_ROTATE'; value: number }
  | { type: 'UPDATE_UI_INVERT'; value: number }
  | { type: 'UPDATE_UI_OPACITY'; value: number }
  | { type: 'UPDATE_UI_SATURATE'; value: number }
  | { type: 'UPDATE_UI_SEPIA'; value: number }
  | { type: 'UPDATE_UI_OVERLAY_COLOR'; value: string }
  | { type: 'UPDATE_TEXT_INPUT_FONT_SIZE'; value: number }
  | { type: 'UPDATE_READER_PANEL_FONT_SIZE'; value: number }
  | { type: 'UPDATE_KEYBINDING'; key: keyof Keybindings; value: string }
  | { type: 'RESET_SETTINGS'}

  function settingsReducer(state: Settings, action: Action): Settings {
    switch (action.type) {
      case 'UPDATE_WPM_TYPE':
        if (action.value !== WPMType.NORMAL && action.value !== WPMType.ASSISTED) {
          console.warn(`Invalid WPM type: ${action.value}`);
          return state;
        }

        return {
          ...state,
          processing: {
            ...state.processing,
            wpm: {
              ...state.processing.wpm,
              type: action.value,
            },
          },
        };

      case 'UPDATE_WPM_SETTING':
        if (action.wpmType !== 'normal' && action.wpmType !== 'assisted') {
          console.warn(`Invalid WPM type: ${action.wpmType}`);
          return state;
        }

        if (action.setting !== 'min' && action.setting !== 'max' && action.setting !== 'current') {
          console.warn(`Invalid WPM setting: ${action.setting}`);
          return state;
        }

        const wpmMode = action.wpmType === 'normal' ? 'normal' : 'assisted';

        if (wpmMode === 'normal') {
          if (action.setting === 'min' && action.value < initialSettings.processing.wpm.normal.min) {
            console.warn(`Invalid WPM min setting for normal mode: ${action.value}`);
            return state;
          }

          if (action.setting === 'max' && action.value > initialSettings.processing.wpm.normal.max) {
            console.warn(`Invalid WPM max setting for normal mode: ${action.value}`);
            return state;
          }

          if (action.setting === 'current' && !isInRange(action.value, initialSettings.processing.wpm.normal.min, initialSettings.processing.wpm.normal.max)) {
            console.warn(`Invalid WPM current setting for normal mode: ${action.value}`);
            return state;
          }
        }

        if (wpmMode === 'assisted') {
          if (action.setting === 'min' && action.value < initialSettings.processing.wpm.assisted.min) {
            console.warn(`Invalid WPM min setting for assisted mode: ${action.value}`);
            return state;
          }

          if (action.setting === 'max' && action.value > initialSettings.processing.wpm.assisted.max) {
            console.warn(`Invalid WPM max setting for assisted mode: ${action.value}`);
            return state;
          }

          if (action.setting === 'current' && !isInRange(action.value, initialSettings.processing.wpm.assisted.min, initialSettings.processing.wpm.assisted.max)) {
            console.warn(`Invalid WPM current setting for assisted mode: ${action.value}`);
            return state;
          }
        }

        return {
          ...state,
          processing: {
            ...state.processing,
            wpm: {
              ...state.processing.wpm,
              [wpmMode]: {
                ...state.processing.wpm[wpmMode],
                [action.setting]: action.value,
              },
            },
          },
        };

      case 'UPDATE_WORD_SEQUENCE_LENGTH':
        if (action.value < 1) {
          console.warn(`Invalid word sequence length: ${action.value}`);
          return state;
        }

        return {
          ...state,
          processing: {
            ...state.processing,
            wordSequenceLength: action.value,
          },
        };

      case 'UPDATE_UI_SIZE':
        if (action.value !== UISize.MEDIUM && action.value !== UISize.LARGE) {
          console.warn(`Invalid UI size: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            size: action.value,
          },
        };

      case 'UPDATE_UI_THEME':
        if (action.value !== ThemeType.LIGHT && action.value !== ThemeType.DARK) {
          console.warn(`Invalid UI theme: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            theme: action.value,
          },
        };

      case 'UPDATE_UI_DEFAULT_DISPLAY':
        if (action.value !== PanelDisplayType.FLASHCARD && action.value !== PanelDisplayType.HORIZONTAL && action.value !== PanelDisplayType.VERTICAL && action.value !== PanelDisplayType.ZOOM) {
          console.warn(`Invalid UI default display: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            defaultDisplayType: action.value,
          },
        };

      case 'UPDATE_UI_BLUR':
        if (typeof action.value === "number" && action.value < 0 && action.value > 10) {
          console.warn(`Invalid UI blur value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            blur: action.value,
          },
        };

      case 'UPDATE_UI_BRIGHTNESS':
        if (typeof action.value === "number" && action.value < 0 && action.value > 3) {
          console.warn(`Invalid UI brightness value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            brightness: action.value,
          },
        };

      case 'UPDATE_UI_CONTRAST':
        if (typeof action.value === "number" && action.value < 0 && action.value > 3) {
          console.warn(`Invalid UI contrast value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            contrast: action.value,
          },
        };

      case 'UPDATE_UI_GRAYSCALE':
        if (typeof action.value === "number" && action.value < 0 && action.value > 1) {
          console.warn(`Invalid UI grayscale value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            grayscale: action.value,
          },
        };

      case 'UPDATE_UI_HUE_ROTATE':
        if (typeof action.value === "number" && action.value < 0 && action.value > 360) {
          console.warn(`Invalid UI hueRotate value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            hueRotate: action.value,
          },
        };

      case 'UPDATE_UI_INVERT':
        if (typeof action.value === "number" && action.value < 0 && action.value > 1) {
          console.warn(`Invalid UI invert value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            invert: action.value,
          },
        };

      case 'UPDATE_UI_OPACITY':
        if (typeof action.value === "number" && action.value < 0 && action.value > 1) {
          console.warn(`Invalid UI opacity value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            opacity: action.value,
          },
        };

      case 'UPDATE_UI_SATURATE':
        if (typeof action.value === "number" && action.value < 0 && action.value > 3) {
          console.warn(`Invalid UI saturate value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            saturate: action.value,
          },
        };

      case 'UPDATE_UI_SEPIA':
        if (typeof action.value === "number" && action.value < 0 && action.value > 1) {
          console.warn(`Invalid UI sepia value: ${action.value}`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            sepia: action.value,
          },
        };

      case 'UPDATE_UI_OVERLAY_COLOR':
        try {
          parseColor(action.value);
        } catch (e) {
          console.warn(`Invalid UI overlay color value: ${action.value}`);
          return state;
        }

        if (typeof action.value !== "string") {
          console.warn(`Invalid UI overlay color value!`);
          return state;
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            overlayColor: action.value,
          },
        };

      case 'UPDATE_TEXT_INPUT_FONT_SIZE':
        if (typeof action.value === "number" && action.value < 0) {
          console.warn(`Invalid text input font size: ${action.value}`);
          return state;
        }

        return {
          ...state,
          textInputPanel: {
            ...state.textInputPanel,
            fontSize: action.value,
          },
        };

      case 'UPDATE_READER_PANEL_FONT_SIZE':
        if (typeof action.value === "number" && action.value < 0) {
          console.warn(`Invalid reader panel font size: ${action.value}`);
          return state;
        }

        return {
          ...state,
          readerPanel: {
            ...state.readerPanel,
            fontSize: action.value,
          },
        };

      case 'UPDATE_KEYBINDING':
        if (!isValidKeybinding(action.key, action.value)) {
          console.warn(`Invalid keybinding: ${action.value}`);
          return state;
        }

        return {
          ...state,
          keybindings: {
            ...state.keybindings,
            [action.key]: action.value,
          },
        };

      case 'RESET_SETTINGS':
        return initialSettings;

      default:
        throw new Error(`Unhandled!`);
    }
  }
interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const settingsObject = localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")) : initialSettings
  const [settings, dispatch] = useReducer(settingsReducer, settingsObject);
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const getThemeObject = (theme: ThemeType): Theme => {
    console.log("Getting theme object: ", theme)
    switch (theme) {
      case ThemeType.DARK:
        return darkTheme;
      case ThemeType.LIGHT:
        return lightTheme;
      default:
        return lightTheme;
    }
  }

  console.log("Loaded settings: ", JSON.stringify(settings));

  return (
    <SettingsContext.Provider value={{ settings, showSettingsMenu, setShowSettingsMenu, dispatch, getThemeObject }}>
      {children}
    </SettingsContext.Provider>
  );
};
