import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, act, screen } from '@testing-library/react';
import { PanelViewportProvider, PanelViewportContext } from '../../../src/react/contexts/PanelViewportContext';
import { PanelDisplayType } from "../../../src/react/SettingsSchema";

const TestPanelViewportContextComponent = () => {
    const { activeView, setActiveView } = useContext(PanelViewportContext);

    return (
        <div>
            <div data-testid="activeView">{activeView}</div>
            <button onClick={() => setActiveView(PanelDisplayType.VERTICAL)}>Set Vertical</button>
        </div>
    );
};

describe('PanelViewportProvider', () => {
    test('renders children and provides default context value', () => {
        render(
            <PanelViewportProvider>
                <TestPanelViewportContextComponent />
            </PanelViewportProvider>
        );

        expect(screen.getByTestId('activeView')).toHaveTextContent(PanelDisplayType.HORIZONTAL.toString());
    });

    test('updates context value when setActiveView is called', () => {
        render(
            <PanelViewportProvider>
                <TestPanelViewportContextComponent />
            </PanelViewportProvider>
        );

        act(() => {
            screen.getByText('Set Vertical').click();
        });

        expect(screen.getByTestId('activeView')).toHaveTextContent(PanelDisplayType.VERTICAL.toString());
    });
});
