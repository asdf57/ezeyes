import '@testing-library/jest-dom';
import React, { useContext, useEffect } from 'react';
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsProvider, SettingsContext, settingsReducer, loadSettings, getThemeObject } from '../../../src/react/contexts/SettingsContext';
import { initialSettings, Keybindings, PanelDisplayType, Settings, ThemeType, UISize, WPMAttribute, WPMType } from '../../../src/react/SettingsSchema';
import { darkTheme, lightTheme } from "@adobe/react-spectrum";
import { PanelContext, PanelProvider } from '../../../src/react/contexts/PanelContext';
import { useKeybindings } from '../../../src/react/hooks/useKeybindings';
import Mousetrap from 'mousetrap';


jest.mock('mousetrap', () => ({
  bind: jest.fn(),
  unbind: jest.fn(),
  stopCallback: jest.fn(),
  reset: jest.fn()
}));

jest.mock('mousetrap-pause', () => jest.fn().mockImplementation(() => require('mousetrap')));

const MockedPlaybackSpeedComponent = () => {
  const { dispatch, settings } = useContext(SettingsContext);

  return (
    <>
      <button onClick={() => dispatch({ type: 'UPDATE_WPM_SETTING', wpmType: 'normal' as WPMType, setting: 'current' as WPMAttribute as WPMAttribute, value: 1337 })}>
        update_wpm_val_for_normal
      </button>
      <div>
        <div data-testid="curNormalWpm">{settings.processing.wpm.normal.current}</div>
      </div>
    </>
  );
};


const MockedWordSeqLenComponent = () => {
  const { curWordSequence, setCurWordSequence } = useContext(PanelContext);
  const { dispatch, settings } = useContext(SettingsContext);

  setCurWordSequence("Success Is Never Final and Failure Never Fatal. It’s Courage That Counts");

  return (
    <>
      <button onClick={() => dispatch({ type: 'UPDATE_WORD_SEQUENCE_LENGTH', value: 5 })}>
          update_word_seq_len
      </button>
      <div>
        <div data-testid="curWordSequenceLen">{settings.processing.wordSequenceLength}</div>
      </div>
      <div>
        <div data-testid="curWordSequence">{curWordSequence}</div>
      </div>
    </>
  );
};


const MousetrapTestComponent = () => {
  const { dispatch, settings } = useContext(SettingsContext);
  useKeybindings(jest.fn(), 1);

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: 'UPDATE_KEYBINDING',
            key: 'nextParagraph',
            value: 'ctrl+g',
          })
        }
      >
        update_next_paragraph_keybind
      </button>
      <div data-testid="nextParagraphKeybind">{settings.keybindings.nextParagraph}</div>
    </div>
  );
};


const TestComponent = () => {
  const { dispatch, settings } = useContext(SettingsContext);
  const { curWordSequence } = useContext(PanelContext)

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: 'UPDATE_WORD_SEQUENCE_LENGTH',
            value: 2,
          })
        }
      >
        Update Word Seq Len
      </button>
      <div data-testid="word-seq-len">{curWordSequence}</div>
    </div>
  );
};


console.log = jest.fn();
console.error = jest.fn();

const TestSettingsContextComponent = () => {
  const { settings, dispatch, showSettingsMenu, setShowSettingsMenu } = useContext(SettingsContext);

  return (
    <div>
      <div data-testid="showSettingsMenu">{showSettingsMenu.toString()}</div>
      <div data-testid="settings">{JSON.stringify(settings)}</div>
      <button onClick={() => setShowSettingsMenu(!showSettingsMenu)}>Toggle Settings Menu</button>
      <button onClick={() => dispatch({type: 'UPDATE_UI_THEME', value: "dark" as ThemeType})} data-testid="updateThemeToDark">
        Set Theme to Dark
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_WPM_TYPE', value: 'normal' as WPMType })}>
        Update WPM Type to Normal
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_WPM_SETTING', wpmType: 'normal' as WPMType, setting: 'min' as WPMAttribute, value: 20 })}>
        Update WPM Setting Min for Normal
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_WORD_SEQUENCE_LENGTH', value: 5 })}>
        Update Word Sequence Length
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_SIZE', value: 'medium' as UISize })}>
        Update UI Size to Medium
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_THEME', value: 'dark' as ThemeType })}>
        Update UI Theme to Dark
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_DEFAULT_DISPLAY', value: 'horizontal' as PanelDisplayType })}>
        Update UI Default Display to Horizontal
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_BLUR', value: 5 })}>
        Update UI Blur
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_BRIGHTNESS', value: 1.5 })}>
        Update UI Brightness
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_CONTRAST', value: 2 })}>
        Update UI Contrast
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_GRAYSCALE', value: 0.5 })}>
        Update UI Grayscale
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_HUE_ROTATE', value: 90 })}>
        Update UI Hue Rotate
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_INVERT', value: 0.75 })}>
        Update UI Invert
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_OPACITY', value: 0.8 })}>
        Update UI Opacity
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_SATURATE', value: 2.5 })}>
        Update UI Saturate
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_SEPIA', value: 0.4 })}>
        Update UI Sepia
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_UI_OVERLAY_COLOR', value: '#ff0000' })}>
        Update UI Overlay Color
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_TEXT_INPUT_FONT_SIZE', value: 16 })}>
        Update Text Input Font Size
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_READER_PANEL_FONT_SIZE', value: 14 })}>
        Update Reader Panel Font Size
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_KEYBINDING', key: 'toggleMenu' as keyof Keybindings, value: 'ctrl+m' })}>
        Update Keybinding for Toggle Menu
      </button>
      <button onClick={() => dispatch({ type: 'RESET_SETTINGS' })}>
        Reset Settings
      </button>
    </div>
  );
};

describe('SettingsProvider', () => {
  test('renders children and provides default context values', () => {
    render(
      <SettingsProvider>
        <TestSettingsContextComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('showSettingsMenu')).toHaveTextContent('false');
    expect(screen.getByTestId('settings')).toHaveTextContent(JSON.stringify(initialSettings));
  });

  test('toggles settings menu visibility', () => {
    render(
      <SettingsProvider>
        <TestSettingsContextComponent />
      </SettingsProvider>
    );

    act(() => {
      screen.getByText('Toggle Settings Menu').click();
    });

    expect(screen.getByTestId('showSettingsMenu')).toHaveTextContent('true');
  });
});

describe('settingsReducer', () => {
  it('Set WPM type to valid values (normal and then assisted)', () => {
    let newState = settingsReducer(initialSettings, { type: 'UPDATE_WPM_TYPE', value: 'normal' as WPMType });
    expect(newState.processing.wpm.type).toEqual('normal');
    newState = settingsReducer(newState, { type: 'UPDATE_WPM_TYPE', value: 'assisted' as WPMType });
    expect(newState.processing.wpm.type).toEqual('assisted');
  });

  it('Set WPM type to invalid value', () => {
    const state = settingsReducer(initialSettings, { type: 'UPDATE_WPM_TYPE', value: 'invalidType' as any});
    expect(state).toEqual(initialSettings);
  });

  it('Set WPM min setting for invalid wpm type', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'invalid' as any,
      setting: 'min' as WPMAttribute,
      value: 20,
    });

    expect(newState).toEqual(initialSettings);
  });

  it('Set invalid WPM setting attribute', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'invalid' as any,
      value: 20,
    });

    expect(newState).toEqual(initialSettings);
  });

  // Assisted WPM mode min settings
  it('Set assisted WPM mode\'s min to invalid smaller value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'min' as WPMAttribute,
      value: -1,
    });
    expect(newState.processing.wpm.assisted.min).toEqual(initialSettings.processing.wpm.assisted.min);
  });

  it('Set assisted WPM mode\'s min to invalid larger value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'min' as WPMAttribute,
      value: 10001,
    });
    expect(newState.processing.wpm.assisted.min).toEqual(initialSettings.processing.wpm.assisted.min);
  });

  it('Set assisted WPM mode\'s min to a valid value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'min' as WPMAttribute,
      value: 20,
    });
    expect(newState.processing.wpm.assisted.min).toEqual(20);
  });

  // Assisted WPM mode max settings
  it('Set assisted WPM mode\'s max to invalid smaller value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'max' as WPMAttribute,
      value: -1, // Invalid since it's smaller than any possible min value
    });
    expect(newState.processing.wpm.assisted.max).toEqual(initialSettings.processing.wpm.assisted.max);
  });

  it('Set assisted WPM mode\'s max to invalid larger value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'max' as WPMAttribute,
      value: 1001, // Invalid since it's larger than any realistic max WPM
    });
    expect(newState.processing.wpm.assisted.max).toEqual(initialSettings.processing.wpm.assisted.max);
  });

  it('Set assisted WPM mode\'s max to valid value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'max' as WPMAttribute,
      value: 150,
    });
    expect(newState.processing.wpm.assisted.max).toEqual(150);
  });

  // Assisted WPM mode current settings
  it('Set assisted WPM mode\'s current to invalid smaller value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'current' as WPMAttribute,
      value: -1,
    });
    expect(newState.processing.wpm.assisted.current).toEqual(initialSettings.processing.wpm.assisted.current);
  });

  it('Set assisted WPM mode\'s current to invalid larger value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'current' as WPMAttribute,
      value: 1001,
    });
    expect(newState.processing.wpm.assisted.current).toEqual(initialSettings.processing.wpm.assisted.current);
  });

  it('Set assisted WPM mode\'s current to valid value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WPM_SETTING',
      wpmType: 'assisted' as WPMType,
      setting: 'current' as WPMAttribute,
      value: 70,
    });
    expect(newState.processing.wpm.assisted.current).toEqual(70);
  });

    // Normal WPM mode min settings
    it('Set normal WPM mode\'s min to invalid smaller value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'min' as WPMAttribute,
        value: -1,
      });
      expect(newState.processing.wpm.normal.min).toEqual(initialSettings.processing.wpm.normal.min);
    });

    it('Set normal WPM mode\'s min to invalid larger value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'min' as WPMAttribute,
        value: 1001,
      });
      expect(newState.processing.wpm.normal.min).toEqual(initialSettings.processing.wpm.normal.min);
    });

    it('Set normal WPM mode\'s min to a valid value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'min' as WPMAttribute,
        value: 175,
      });
      expect(newState.processing.wpm.normal.min).toEqual(175);
    });

    // Normal WPM mode max settings
    it('Set normal WPM mode\'s max to invalid smaller value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'max' as WPMAttribute,
        value: -1,
      });
      expect(newState.processing.wpm.normal.max).toEqual(initialSettings.processing.wpm.normal.max);
    });

    it('Set normal WPM mode\'s max to invalid larger value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'max' as WPMAttribute,
        value: 9999999999999,
      });
      expect(newState.processing.wpm.normal.max).toEqual(initialSettings.processing.wpm.normal.max);
    });

    it('Set normal WPM mode\'s max to valid value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'max' as WPMAttribute,
        value: 300, // Valid max value
      });
      expect(newState.processing.wpm.normal.max).toEqual(300);
    });

    // Normal WPM mode current settings
    it('Set normal WPM mode\'s current to invalid smaller value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'current' as WPMAttribute,
        value: -1,
      });
      expect(newState.processing.wpm.normal.current).toEqual(initialSettings.processing.wpm.normal.current);
    });

    it('Set normal WPM mode\'s current to invalid larger value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'current' as WPMAttribute,
        value: 1001,
      });
      expect(newState.processing.wpm.normal.current).toEqual(initialSettings.processing.wpm.normal.current);
    });

    it('Set normal WPM mode\'s current to valid value.', () => {
      const newState = settingsReducer(initialSettings, {
        type: 'UPDATE_WPM_SETTING',
        wpmType: 'normal' as WPMType,
        setting: 'current' as WPMAttribute,
        value: 400,
      });
      expect(newState.processing.wpm.normal.current).toEqual(400);
    });

  it('should set delta to a valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_WPM_DELTA', value: 10 });
    expect(newState.processing.wpm.delta).toEqual(10);
  });

  it('should not update state if delta value is 0', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_WPM_DELTA', value: 0 });
    expect(newState.processing.wpm.delta).toEqual(initialSettings.processing.wpm.delta);
  });

  it('should not update state if delta value is negative', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_WPM_DELTA', value: -5 });
    expect(newState.processing.wpm.delta).toEqual(initialSettings.processing.wpm.delta);
  });

  it('should not update state if delta value is not a number', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_WPM_DELTA', value: 'invalid' as any });
    expect(newState.processing.wpm.delta).toEqual(initialSettings.processing.wpm.delta);
  });

  it('Set word sequence length to invalid value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WORD_SEQUENCE_LENGTH',
      value: -1,
    });
    expect(newState.processing.wordSequenceLength).toEqual(initialSettings.processing.wordSequenceLength);
  });

  it('Set word sequence length to valid value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_WORD_SEQUENCE_LENGTH',
      value: 5,
    });
    expect(newState.processing.wordSequenceLength).toEqual(5);
  });

  it('Set ui size to invalid value.', () => {
    const newState = settingsReducer(initialSettings, {
      type: 'UPDATE_UI_SIZE',
      value: 'invalidSize' as any,
    });
    expect(newState.ui.size).toEqual(initialSettings.ui.size);
  });

  it('Set ui size to valid values (UISize\'s medium and large values)', () => {
    let newState = settingsReducer(initialSettings, {
      type: 'UPDATE_UI_SIZE',
      value: 'medium' as UISize,
    });
    expect(newState.ui.size).toEqual('medium');
    newState = settingsReducer(newState, {
      type: 'UPDATE_UI_SIZE',
      value: 'large' as UISize,
    });
    expect(newState.ui.size).toEqual('large');
  });

  it('Set ui defaultDisplayType to invalid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_DEFAULT_DISPLAY', value: 'invalidDisplayType' as any });
    expect(newState.ui.defaultDisplayType).toEqual(initialSettings.ui.defaultDisplayType);
  });

  it('Set ui defaultDisplayType to valid values (All PanelDisplayType values)', () => {
    const displayTypes = ['flashcard', 'horizontal', 'vertical', 'zoom'];
    displayTypes.forEach((displayType) => {
      const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_DEFAULT_DISPLAY', value: displayType as PanelDisplayType });
      expect(newState.ui.defaultDisplayType).toEqual(displayType);
    });
  });

  it('Set ui theme to invalid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_THEME', value: 'invalid' as any });
    expect(newState.ui.theme).toEqual(initialSettings.ui.theme);
  });

  it('Set ui theme to valid values (All ThemeType values)', () => {
    ['dark', 'light'].forEach(themeType => {
      const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_THEME', value: themeType as ThemeType });
      expect(newState.ui.theme).toEqual(themeType);
    });
  });

  it('Set blur to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_BLUR', value: -1 });
    expect(newState.ui.blur).toEqual(initialSettings.ui.blur);
  });

  it('Set blur to invalid value outside of upper max boundary (i.e., greater than 10)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_BLUR', value: 11 });
    expect(newState.ui.blur).toEqual(initialSettings.ui.blur);
  });

  it('Set blur to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_BLUR', value: 5 });
    expect(newState.ui.blur).toEqual(5);
  });

  // Brightness
  it('Set brightness to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_BRIGHTNESS', value: -1 });
    expect(newState.ui.brightness).toEqual(initialSettings.ui.brightness);
  });

  it('Set brightness to invalid value outside of upper max boundary (i.e., greater than 3)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_BRIGHTNESS', value: 4 });
    expect(newState.ui.brightness).toEqual(initialSettings.ui.brightness);
  });

  it('Set brightness to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_BRIGHTNESS', value: 2 });
    expect(newState.ui.brightness).toEqual(2);
  });

  it('Set contrast to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_CONTRAST', value: -1 });
    expect(newState.ui.contrast).toEqual(initialSettings.ui.contrast);
  });

  it('Set contrast to invalid value outside of upper max boundary (i.e., greater than 3)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_CONTRAST', value: 4 });
    expect(newState.ui.contrast).toEqual(initialSettings.ui.contrast);
  });

  it('Set contrast to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_CONTRAST', value: 2 });
    expect(newState.ui.contrast).toEqual(2);
  });

  it('Set grayscale to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_GRAYSCALE', value: -1 });
    expect(newState.ui.grayscale).toEqual(initialSettings.ui.grayscale);
  });

  it('Set grayscale to invalid value outside of upper max boundary (i.e., greater than 1)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_GRAYSCALE', value: 2 });
    expect(newState.ui.grayscale).toEqual(initialSettings.ui.grayscale);
  });

  it('Set grayscale to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_GRAYSCALE', value: 0.5 });
    expect(newState.ui.grayscale).toEqual(0.5);
  });

  it('Set hueRotate to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_HUE_ROTATE', value: -1 });
    expect(newState.ui.hueRotate).toEqual(initialSettings.ui.hueRotate);
  });

  it('Set hueRotate to invalid value outside of upper max boundary (i.e., greater than 360)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_HUE_ROTATE', value: 361 });
    expect(newState.ui.hueRotate).toEqual(initialSettings.ui.hueRotate);
  });

  it('Set hueRotate to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_HUE_ROTATE', value: 180 });
    expect(newState.ui.hueRotate).toEqual(180);
  });

  it('Set invert to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_INVERT', value: -1 });
    expect(newState.ui.invert).toEqual(initialSettings.ui.invert);
  });

  it('Set invert to invalid value outside of upper max boundary (i.e., greater than 1)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_INVERT', value: 2 });
    expect(newState.ui.invert).toEqual(initialSettings.ui.invert);
  });

  it('Set invert to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_INVERT', value: 0.5 });
    expect(newState.ui.invert).toEqual(0.5);
  });

  it('Set opacity to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_OPACITY', value: -1 });
    expect(newState.ui.opacity).toEqual(initialSettings.ui.opacity);
  });

  it('Set opacity to invalid value outside of upper max boundary (i.e., greater than 1)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_OPACITY', value: 2 });
    expect(newState.ui.opacity).toEqual(initialSettings.ui.opacity);
  });

  it('Set opacity to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_OPACITY', value: 0.8 });
    expect(newState.ui.opacity).toEqual(0.8);
  });

  it('Set saturate to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_SATURATE', value: -1 });
    expect(newState.ui.saturate).toEqual(initialSettings.ui.saturate);
  });

  it('Set saturate to invalid value outside of upper max boundary (i.e., greater than 3)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_SATURATE', value: 4 });
    expect(newState.ui.saturate).toEqual(initialSettings.ui.saturate);
  });

  it('Set saturate to valid value', () => {
    const newState = settingsReducer(initialSettings,  { type: 'UPDATE_UI_SATURATE', value: 2 });
    expect(newState.ui.saturate).toEqual(2);
  });

  it('Set sepia to invalid value outside of lower min boundary (i.e., less than 0)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_SEPIA', value: -1 });
    expect(newState.ui.sepia).toEqual(initialSettings.ui.sepia);
  });

  it('Set sepia to invalid value outside of upper max boundary (i.e., greater than 1)', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_SEPIA', value: 2 });
    expect(newState.ui.sepia).toEqual(initialSettings.ui.sepia);
  });

  it('Set sepia to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_SEPIA', value: 0.5 });
    expect(newState.ui.sepia).toEqual(0.5);
  });

  it('Set overlayColor to invalid color value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_OVERLAY_COLOR', value: 'notAColor' });
    expect(newState.ui.overlayColor).toEqual(initialSettings.ui.overlayColor);
  });

  it('Set overlayColor to valid color value of format "#ff00ff00"', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_OVERLAY_COLOR', value: '#ff00ff00' });
    expect(newState.ui.overlayColor).toEqual('#ff00ff00');
  });

  it('Set overlayColor to valid color value of format "rgba(255, 0, 255, 0)"', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_UI_OVERLAY_COLOR', value: 'rgba(255, 0, 255, 0)' });
    expect(newState.ui.overlayColor).toEqual('rgba(255, 0, 255, 0)');
  });

  it('Set textInputPanel fontSize to invalid value of 0', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_TEXT_INPUT_FONT_SIZE', value: 0 });
    expect(newState.textInputPanel.fontSize).toEqual(initialSettings.textInputPanel.fontSize);
  });

  it('Set textInputPanel fontSize to invalid value less than 0', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_TEXT_INPUT_FONT_SIZE', value: -1 });
    expect(newState.textInputPanel.fontSize).toEqual(initialSettings.textInputPanel.fontSize);
  });

  it('Set textInputPanel fontSize to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_TEXT_INPUT_FONT_SIZE', value: 16 });
    expect(newState.textInputPanel.fontSize).toEqual(16);
  });

  it('Set readerPanel fontSize to invalid value of 0', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_READER_PANEL_FONT_SIZE', value: 0 });
    expect(newState.readerPanel.fontSize).toEqual(initialSettings.readerPanel.fontSize);
  });

  it('Set readerPanel fontSize to invalid value less than 0', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_READER_PANEL_FONT_SIZE', value: -1 });
    expect(newState.readerPanel.fontSize).toEqual(initialSettings.readerPanel.fontSize);
  });

  it('Set readerPanel fontSize to valid value', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_READER_PANEL_FONT_SIZE', value: 14 });
    expect(newState.readerPanel.fontSize).toEqual(14);
  });

  it('Set keybindings play to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'play', value: 'Shift+k' });
    expect(newState.keybindings.play).toEqual(initialSettings.keybindings.play);
  });

  it('Set keybindings play to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'play', value: 'space' });
    expect(newState.keybindings.play).toEqual('space');
  });

  it('Set keybindings nextWord to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'nextWord', value: 'Alt++' });
    expect(newState.keybindings.nextWord).toEqual(initialSettings.keybindings.nextWord);
  });

  it('Set keybindings nextWord to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'nextWord', value: 'e' });
    expect(newState.keybindings.nextWord).toEqual('e');
  });

  it('Set keybindings prevWord to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'prevWord', value: 'Ctrl++' });
    expect(newState.keybindings.prevWord).toEqual(initialSettings.keybindings.prevWord);
  });

  it('Set keybindings prevWord to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'prevWord', value: 'g' });
    expect(newState.keybindings.prevWord).toEqual('g');
  });

  it('Set keybindings prevWord toinvalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'prevWord', value: 'MOD+222' });
    expect(newState.keybindings.prevWord).toEqual(initialSettings.keybindings.prevWord);
  });

  it('Set keybindings openSettings to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'openSettings', value: 'O' });
    expect(newState.keybindings.openSettings).toEqual('O');
  });

  it('Set keybindings openSettings to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'openSettings', value: 'OO' });
    expect(newState.keybindings.openSettings).toEqual(initialSettings.keybindings.openSettings);
  });

  it('Set keybindings switchView to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'switchView', value: 'lol' });
    expect(newState.keybindings.switchView).toEqual(initialSettings.keybindings.switchView);
  });

  it('Set keybindings switchView to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'switchView', value: 'v' });
    expect(newState.keybindings.switchView).toEqual('v');
  });

  it('Set keybindings importFile to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'importFile', value: 'iii' });
    expect(newState.keybindings.importFile).toEqual(initialSettings.keybindings.importFile);
  });

  it('Set keybindings importFile to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'importFile', value: 'i' });
    expect(newState.keybindings.importFile).toEqual('i');
  });

  it('Set keybindings prevParagraph to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'prevParagraph', value: 'ctrl+ka' });
    expect(newState.keybindings.prevParagraph).toEqual(initialSettings.keybindings.prevParagraph);
  });

  it('Set keybindings prevParagraph to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'prevParagraph', value: 'ctrl+k' });
    expect(newState.keybindings.prevParagraph).toEqual('ctrl+k');
  });

  it('Set keybindings nextParagraph to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'nextParagraph', value: 'ctrl+shift+jj' });
    expect(newState.keybindings.nextParagraph).toEqual(initialSettings.keybindings.nextParagraph);
  });

  it('Set keybindings nextParagraph to valid key binding', () => {
    const newState = settingsReducer(initialSettings,  { type: 'UPDATE_KEYBINDING', key: 'nextParagraph', value: 'ctrl+shift+j' });
    expect(newState.keybindings.nextParagraph).toEqual('ctrl+shift+j');
  });

  it('Set keybindings prevSentence to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'prevSentence', value: 'alt+ooo' });
    expect(newState.keybindings.prevSentence).toEqual(initialSettings.keybindings.prevSentence);
  });

  it('Set keybindings prevSentence to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'prevSentence', value: 'alt+o' });
    expect(newState.keybindings.prevSentence).toEqual('alt+o');
  });

  it('Set keybindings nextSentence to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'nextSentence', value: 'wwd' });
    expect(newState.keybindings.nextSentence).toEqual(initialSettings.keybindings.nextSentence);
  });

  it('Set keybindings nextSentence to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'nextSentence', value: 'p' });
    expect(newState.keybindings.nextSentence).toEqual('p');
  });

  it('Set keybindings flipFlashcard to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'flipFlashcard', value: 'fj' });
    expect(newState.keybindings.flipFlashcard).toEqual(initialSettings.keybindings.flipFlashcard);
  });

  it('Set keybindings flipFlashcard to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'flipFlashcard', value: 'f' });
    expect(newState.keybindings.flipFlashcard).toEqual('f');
  });

  it('Set keybindings backToTop to invalid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'backToTop', value: 'bbb' });
    expect(newState.keybindings.backToTop).toEqual(initialSettings.keybindings.backToTop);
  });

  it('Set keybindings backToTop to valid key binding', () => {
    const newState = settingsReducer(initialSettings, { type: 'UPDATE_KEYBINDING', key: 'backToTop', value: 'b' });
    expect(newState.keybindings.backToTop).toEqual('b');
  });

  it('Handle RESET_SETTINGS action', () => {
    let mutatedState = settingsReducer(initialSettings, {
      type: 'UPDATE_UI_THEME',
      value: 'dark' as ThemeType,
    });

    mutatedState = settingsReducer(mutatedState, { type: 'RESET_SETTINGS' });

    waitFor(() => expect(mutatedState).toEqual(initialSettings));
  });

  it('Unhandled action type', () => {
    expect(() => {
      settingsReducer(initialSettings, { type: 'UNKNOWN_ACTION' } as any);
    }).toThrow("Unhandled!");
  });
});

describe('loadSettings tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('loads default settings when there are no saved settings', () => {
    localStorage.clear();
    const loadedSettings = loadSettings();
    expect(loadedSettings).toEqual(initialSettings);
  });

  it('loads saved settings correctly when they exist', () => {
    let mutatedState = settingsReducer(initialSettings, {
      type: 'UPDATE_UI_THEME',
      value: 'dark' as ThemeType,
    });

    const savedSettings = JSON.stringify(mutatedState);
    localStorage.setItem('settings', savedSettings);

    const loadedSettings = loadSettings();
    expect(loadedSettings).toEqual(JSON.parse(savedSettings));
  });

  it('handles corrupt settings gracefully and falls back to initial settings', () => {
    const corruptSettings = "not valid JSON";
    localStorage.setItem('settings', corruptSettings);

    const loadedSettings = loadSettings();
    expect(loadedSettings).toEqual(initialSettings);
  });

  it('handles saved settings with different keys by falling back to initial settings', () => {
    const differentKeysSettings = JSON.stringify({ someOtherKey: 'someValue' });
    localStorage.setItem('settings', differentKeysSettings);

    const loadedSettings = loadSettings();
    expect(loadedSettings).toEqual(initialSettings);
  });

  it('handles null as saved settings gracefully and falls back to initial settings', () => {
    localStorage.setItem('settings', JSON.stringify(null));

    const loadedSettings = loadSettings();
    expect(loadedSettings).toEqual(initialSettings);
  });
});


describe('SettingsContext tests', () => {
  it('Mutated settings object can be set as the new SettingsContext', async () => {
    const { getByText, getByTestId } = render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ settings, dispatch }) => (
            <>
              <span data-testid="current-theme">{settings.ui.theme}</span>
              <button onClick={() => dispatch({ type: 'UPDATE_UI_THEME', value: ThemeType.LIGHT })}>
                Change Theme
              </button>
            </>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    expect(getByTestId('current-theme').textContent).toBe('dark');

    const changeThemeButton = getByText('Change Theme');

    await waitFor(() => userEvent.click(changeThemeButton));

    expect(getByTestId('current-theme').textContent).toBe('light');
  });

  it('Invalid settings object cannot be set as the new SettingsContext', async () => {
    const { getByText, getByTestId } = render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ settings, dispatch }) => (
            <>
              <span data-testid="current-sepia">{settings.ui.sepia}</span>
              <button onClick={() => dispatch({ type: 'UPDATE_UI_SEPIA', value: -50 })}>
                Change Sepia
              </button>
            </>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const changeSepiaButton = getByText('Change Sepia');

    await waitFor(() => userEvent.click(changeSepiaButton));

    expect(getByTestId('current-sepia').textContent).toBe(initialSettings.ui.sepia.toString());
  });
});

describe('panel system integrations', () => {
  it("Default theme (light theme) object is returned for an invalid theme type", () => {
    const theme = getThemeObject('invalidTheme' as ThemeType);
    expect(theme).toEqual(lightTheme);
  });

  it("Dark theme object is returned if the dark theme type is specified", () => {
    const theme = getThemeObject(ThemeType.DARK);
    expect(theme).toEqual(darkTheme);
  });

  it("Light theme object is returned if the light theme type is specified", () => {
    const theme = getThemeObject(ThemeType.LIGHT);
    expect(theme).toEqual(lightTheme);
  });
});

describe('panel system integrations', () => {
  it('Update the WPM attribute in the SettingsContext and verify a change in the Panel System', () => {
    render(
      <SettingsProvider>
        <PanelProvider>
          <MockedPlaybackSpeedComponent />
        </PanelProvider>
      </SettingsProvider>
    );

    const button = screen.getByText('update_wpm_val_for_normal');
    fireEvent.click(button);

    // Verify normal wpm current speed
    waitFor(() => expect(screen.getByTestId('curNormalWpm')).toHaveTextContent('1337'));
  });

  it('Update the word sequence display length attribute in the SettingsContext and verify change in the Panel System', () => {
    render(
      <SettingsProvider>
        <PanelProvider>
          <MockedWordSeqLenComponent />
        </PanelProvider>
      </SettingsProvider>
    );

    const button = screen.getByText('update_word_seq_len');
    fireEvent.click(button);

    // Verify the word sequence length was updated in settings
    waitFor(() => expect(screen.getByTestId('curWordSequenceLen')).toHaveTextContent('5'));
    // Verify that the length of the current word sequence in the PanelContext equals the updated word sequence length
    const curWordSequence = screen.getByTestId('curWordSequence').textContent;
    waitFor(() => expect(curWordSequence?.split(' ').length).toEqual(5));
    waitFor(() => expect(curWordSequence).toEqual("Success Is Never Final and"));
  });

});

describe('Keybind integrations', () => {
  it('Update a keybind attribute in the SettingsContext and verify a keybind system update', () => {
    render(
      <SettingsProvider>
        <PanelProvider>
          <MousetrapTestComponent />
        </PanelProvider>
      </SettingsProvider>
    );

    const button = screen.getByText('update_next_paragraph_keybind');
    fireEvent.click(button);

    // Verify keybinding updated in settings
    expect(screen.getByTestId('nextParagraphKeybind')).toHaveTextContent('ctrl+g');

    // Verify that Mousetrap.bind was called for the new keybinding
    expect(Mousetrap.bind).toHaveBeenCalledWith('ctrl+g', expect.any(Function));
  });
});

