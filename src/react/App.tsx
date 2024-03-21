import React, { useContext } from "react";
import PanelViewport from "./components/PanelViewport";
import KeybindingManager from "./components/KeybindingManager";
import FocusManager from "./components/FocusManager";
import SystemErrorModal from "./components/SystemErrorModal";
import { PanelProvider } from "./contexts/PanelContext";
import { SettingsContext, SettingsProvider } from './contexts/SettingsContext';
import { PanelViewportProvider } from "./contexts/PanelViewportContext";
import { MenuManagerProvider } from "./contexts/MenuManagerContext";
import { Provider, darkTheme, lightTheme } from "@adobe/react-spectrum";
import { ErrorBoundary } from "react-error-boundary";
import { FileManagerProvider } from "./contexts/FileManagerContext";
import "./styles/index.css";
import UIProvider from "./components/UIProvider";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <UIProvider>
        <ErrorBoundary FallbackComponent={SystemErrorModal}>
        <PanelViewportProvider>
        <PanelProvider>
          <FileManagerProvider>        
              <MenuManagerProvider>
              <PanelViewport />
              <KeybindingManager />
              <FocusManager />
              </MenuManagerProvider>
          </FileManagerProvider>
        </PanelProvider>
        </PanelViewportProvider>
        </ErrorBoundary>
      </UIProvider>
    </SettingsProvider>

  );
};

export default App;
