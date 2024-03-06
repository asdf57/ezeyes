
export const read = async (filePath: string, type: string): Promise<Buffer | undefined> => {
    const { ipcRenderer } = window.require('electron');
    return ipcRenderer.invoke('read', filePath, type);
};

export const write = async (filePath: string, content: string): Promise<void> => {
    const { ipcRenderer } = window.require('electron');
    await ipcRenderer.invoke('write', filePath, content);
};

export const spawnFileDialog = async (): Promise<string | undefined> => {
    const { ipcRenderer } = window.require('electron');
    return ipcRenderer.invoke('spawn-file-dialog');
};

export const readPdf = async (filePath: string): Promise<Buffer | undefined> => {
    const { ipcRenderer } = window.require('electron');
    return ipcRenderer.invoke('read-pdf', filePath);
};

