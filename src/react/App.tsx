import React from "react";
import PanelViewport from "./components/PanelViewport";
import KeybindingManager from "./components/KeybindingManager";
import FocusManager from "./components/FocusManager";
import SystemErrorModal from "./components/SystemErrorModal";
import { PanelProvider } from "./contexts/PanelContext";
import { SettingsProvider } from './contexts/SettingsContext';
import { PanelViewportProvider } from "./contexts/PanelViewportContext";
import { MenuManagerProvider } from "./contexts/MenuManagerContext";
import { Provider, lightTheme } from "@adobe/react-spectrum";
import { ErrorBoundary } from "react-error-boundary";
import { FileManagerProvider } from "./contexts/FileManagerContext";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <Provider theme={lightTheme}>
      <ErrorBoundary FallbackComponent={SystemErrorModal}>
      <PanelViewportProvider>
      <PanelProvider>
        <FileManagerProvider>        
          <SettingsProvider>
            <MenuManagerProvider>
            <PanelViewport />
            <KeybindingManager />
            <FocusManager />
            </MenuManagerProvider>
          </SettingsProvider>
        </FileManagerProvider>
      </PanelProvider>
      </PanelViewportProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
