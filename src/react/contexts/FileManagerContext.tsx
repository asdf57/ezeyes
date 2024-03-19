import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FileManagerContextType {
    currentFiles: string[];
    setCurrentFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultContextValue: FileManagerContextType = {
    currentFiles: localStorage.getItem("filePaths")?JSON.parse(localStorage.getItem("filePaths")):[],
    setCurrentFiles: () => {}
};

export const FileManagerContext = createContext<FileManagerContextType>(defaultContextValue);

export const FileManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentFiles, setCurrentFiles] = useState<string[]>(defaultContextValue.currentFiles);

    return (
        <FileManagerContext.Provider value={{ currentFiles, setCurrentFiles }}>
            {children}
        </FileManagerContext.Provider>
    );
};
