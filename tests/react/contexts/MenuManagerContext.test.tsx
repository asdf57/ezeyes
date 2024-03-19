import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import { MenuManagerProvider, MenuManagerContext, MenuType } from '../../../src/react/contexts/MenuManagerContext';

const TestMenuManagerContextComponent = () => {
    const { currentMenu, setCurrentMenu } = useContext(MenuManagerContext);

    return (
        <>
            <div data-testid="currentMenu">{currentMenu}</div>
            <button onClick={() => setCurrentMenu(MenuType.SETTINGS)}>Set Menu to Settings</button>
        </>
    );
};

describe('MenuManagerContext', () => {
    test('provides default context values', () => {
        render(
            <MenuManagerProvider>
                <TestMenuManagerContextComponent />
            </MenuManagerProvider>
        );

        const currentMenu = screen.getByTestId('currentMenu');
        expect(currentMenu).toHaveTextContent('');
    });

    test('updates context value when setCurrentMenu is called', () => {
        render(
            <MenuManagerProvider>
                <TestMenuManagerContextComponent />
            </MenuManagerProvider>
        );

        const button = screen.getByRole('button', { name: /set menu to settings/i });
        act(() => {
            button.click();
        });

        const currentMenu = screen.getByTestId('currentMenu');
        expect(currentMenu).toHaveTextContent(MenuType.SETTINGS.toString());
    });
});
