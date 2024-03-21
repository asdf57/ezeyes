import React, { useContext, useEffect } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { Provider } from "@adobe/react-spectrum";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const { settings, getThemeObject } = useContext(SettingsContext);

    const filter = `
        blur(${settings.ui.blur}px) 
        brightness(${settings.ui.brightness}) 
        contrast(${settings.ui.contrast}) 
        grayscale(${settings.ui.grayscale}) 
        hue-rotate(${settings.ui.hueRotate}deg) 
        invert(${settings.ui.invert}) 
        opacity(${settings.ui.opacity}) 
        saturate(${settings.ui.saturate}) 
        sepia(${settings.ui.sepia})
    `;

    useEffect(() => {
        document.body.style.filter = filter;

        const styleId = 'irlen-overlay-style';
        let styleTag = document.getElementById(styleId) || document.createElement('style');
        styleTag.id = styleId;
        styleTag.innerHTML = `
            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: ${settings.ui.overlayColor};
                pointer-events: none;
                z-index: 9999;
            }
        `;
        if (!document.getElementById(styleId)) {
            document.head.appendChild(styleTag);
        }
    }, [filter, settings.ui.overlayColor]);

    return (
        <Provider theme={getThemeObject(settings.ui.theme)} scale={settings.ui.size}>
            {children}
        </Provider>
    );
};

export default UIProvider;
