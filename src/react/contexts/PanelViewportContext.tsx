import React, { createContext, useState, ReactNode } from 'react';
import { PanelDisplayType } from "../SettingsSchema";

export enum PanelType {
    READER, TEXT_INPUT
}

interface PanelViewportContextType {
    activeView: PanelDisplayType;
    activeFlashcard: PanelType;
    setActiveView: React.Dispatch<React.SetStateAction<PanelDisplayType>>;
    setActiveFlashcard: React.Dispatch<React.SetStateAction<PanelType>>;
}

const defaultContextValue: PanelViewportContextType = {
    activeView: PanelDisplayType.HORIZONTAL,
    activeFlashcard: PanelType.READER,
    setActiveView: () => {},
    setActiveFlashcard: () => {}
};

export const PanelViewportContext = createContext<PanelViewportContextType>(defaultContextValue);

export const PanelViewportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeView, setActiveView] = useState<PanelDisplayType>(defaultContextValue.activeView);
    const [activeFlashcard, setActiveFlashcard] = useState<PanelType>(defaultContextValue.activeFlashcard);

    return (
        <PanelViewportContext.Provider value={{ activeView, setActiveView, activeFlashcard, setActiveFlashcard }}>
            {children}
        </PanelViewportContext.Provider>
    );
};
