import { useEffect, useContext, useRef, Key } from 'react';
import { useFileManager } from './useFileManager';
import { PanelContext } from '../contexts/PanelContext';
import { FileManagerContext } from '../contexts/FileManagerContext';
import { initialSettings } from '../SettingsSchema';
import { SettingsContext } from '../contexts/SettingsContext';
import { darkThemeToggle } from '../../electron/ipc';

export const useFileMenuBar = () => {
    const { promptAndLoadFile, loadFile } = useFileManager();
    const { currentFiles, setCurrentFiles } = useContext(FileManagerContext);
    const { setTextContent, setCurWordSequenceIndex } = useContext(PanelContext);
    const { settings, setSettings } = useContext(SettingsContext);

    const resetPreferences = () => {
        setCurrentFiles([]);
        localStorage.setItem("filePaths", JSON.stringify([]));
        setSettings(initialSettings);
    };

    useEffect(() => {
        if(currentFiles.length !== 0){
            localStorage.setItem("filePaths", JSON.stringify(currentFiles));
        }
    }, [currentFiles]);

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    const themes = async() => {
        await darkThemeToggle();
    }

    const processOptions = (key: Key) => {
        if (key == "pass") {
            return;
        } else if (key == "load") {
            promptAndLoadFile();
        } else if (key == "reset") {
            resetPreferences();
        } else if (key = "toggle-dark-mode"){
            themes();
        } else {
            loadFile(key.toString(), setTextContent, setCurWordSequenceIndex);
        }
    };

    return { processOptions, resetPreferences };
};