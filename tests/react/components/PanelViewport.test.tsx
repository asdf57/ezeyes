import React, { ReactElement } from 'react';
import PanelViewport from '../../../src/react/components/PanelViewport';
import { render, RenderOptions } from '@testing-library/react';
import { PanelContext } from '../../../src/react/contexts/PanelContext';
import { PanelViewportContext } from '../../../src/react/contexts/PanelViewportContext';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { PanelDisplayType } from '../../../src/react/SettingsSchema';

interface ProviderProps {
    theme?: typeof defaultTheme;
}

const renderWithProviders = (
    ui: ReactElement,
    { providerProps, ...renderOptions }: { providerProps?: ProviderProps } & RenderOptions = {}
) => {
    return render(
        <Provider theme={defaultTheme} {...providerProps}>
            {ui}
        </Provider>,
        renderOptions
    );
};

describe('PanelViewport component', () => {
    it('renders without crashing', () => {
        const { container } = renderWithProviders(
            <PanelContext.Provider value={{
                isPlaying: false,
                curWordSequence: [],
                setCurWordSequence: jest.fn(),
                textContent: '',
                setTextContent: jest.fn(),
                setIsPlaying: jest.fn()
            }}>
                <PanelViewportContext.Provider value={{
                    activeView: PanelDisplayType.HORIZONTAL,
                    setActiveView: jest.fn()
                }}>
                    <PanelViewport />
                </PanelViewportContext.Provider>
            </PanelContext.Provider>,
            {}
        );
        expect(container).toBeTruthy();
    });

    it('renders horizontal view', () => {
        renderWithProviders(
            <PanelContext.Provider value={{
                isPlaying: false,
                curWordSequence: [],
                setCurWordSequence: jest.fn(),
                textContent: '',
                setTextContent: jest.fn(),
                setIsPlaying: jest.fn()
            }}>
                <PanelViewportContext.Provider value={{
                    activeView: PanelDisplayType.HORIZONTAL,
                    setActiveView: jest.fn()
                }}>
                    <PanelViewport />
                </PanelViewportContext.Provider>
            </PanelContext.Provider>,
            {}
        );

        const panelContainer = document.getElementById('horizontal-panel-container');
        expect(panelContainer).toBeInTheDocument();
    });

    it('renders vertical view', () => {
        renderWithProviders(
            <PanelContext.Provider value={{
                isPlaying: false,
                curWordSequence: [],
                setCurWordSequence: jest.fn(),
                textContent: '',
                setTextContent: jest.fn(),
                setIsPlaying: jest.fn()
            }}>
                <PanelViewportContext.Provider value={{
                    activeView: PanelDisplayType.VERTICAL,
                    setActiveView: jest.fn()
                }}>
                    <PanelViewport />
                </PanelViewportContext.Provider>
            </PanelContext.Provider>,
            {}
        );

        const panelContainer = document.getElementById('vertical-panel-container');
        expect(panelContainer).toBeInTheDocument();
    });

    it('renders zoom view', () => {
        renderWithProviders(
            <PanelContext.Provider value={{
                isPlaying: false,
                curWordSequence: [],
                setCurWordSequence: jest.fn(),
                textContent: '',
                setTextContent: jest.fn(),
                setIsPlaying: jest.fn()
            }}>
                <PanelViewportContext.Provider value={{
                    activeView: PanelDisplayType.ZOOM,
                    setActiveView: jest.fn()
                }}>
                    <PanelViewport />
                </PanelViewportContext.Provider>
            </PanelContext.Provider>,
            {}
        );

        const panelContainer = document.getElementById('zoom-container');
        expect(panelContainer).toBeInTheDocument();
    });

    it('renders flashcard view', () => {
        renderWithProviders(
            <PanelContext.Provider value={{
                isPlaying: false,
                curWordSequence: [],
                setCurWordSequence: jest.fn(),
                textContent: '',
                setTextContent: jest.fn(),
                setIsPlaying: jest.fn()
            }}>
                <PanelViewportContext.Provider value={{
                    activeView: PanelDisplayType.FLASHCARD,
                    setActiveView: jest.fn()
                }}>
                    <PanelViewport />
                </PanelViewportContext.Provider>
            </PanelContext.Provider>,
            {}
        );

        const panelContainer = document.getElementById('flashcard-container');
        expect(panelContainer).toBeInTheDocument();
    });
});
