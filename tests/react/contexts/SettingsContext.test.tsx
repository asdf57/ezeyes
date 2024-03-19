import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, act, screen } from '@testing-library/react';
import { SettingsProvider, SettingsContext } from '../../../src/react/contexts/SettingsContext';
import { initialSettings } from '../../../src/react/SettingsSchema';

const TestSettingsContextComponent = () => {
  const { settings, setSettings, showSettingsMenu, setShowSettingsMenu } = useContext(SettingsContext);

  return (
    <div>
      <div data-testid="showSettingsMenu">{showSettingsMenu.toString()}</div>
      <div data-testid="settings">{JSON.stringify(settings)}</div>
      <button onClick={() => setShowSettingsMenu(!showSettingsMenu)}>Toggle Settings Menu</button>
      <button onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}>Set Dark Theme</button>
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

  test('updates settings correctly', () => {
    render(
      <SettingsProvider>
        <TestSettingsContextComponent />
      </SettingsProvider>
    );

    act(() => {
      screen.getByText('Set Dark Theme').click();
    });

    expect(screen.getByTestId('settings')).toHaveTextContent('"theme":"dark"');
  });
});
