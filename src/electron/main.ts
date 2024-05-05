import { app, BrowserWindow, dialog, ipcMain, nativeTheme } from 'electron';
import * as fs from 'fs';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
import * as mammoth from 'mammoth';
const pdf = require('pdf-parse');


declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.on('found-in-page', (event, result) => {
    if (result.finalUpdate) {
      mainWindow.webContents.stopFindInPage('keepSelection');
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

//Set to disable Electron from overriding custom themes
nativeTheme.themeSource = 'light';

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('read', async (_, filePath, type) => {
  try {
    const content = fs.readFileSync(filePath, type || 'utf8');
    return content;
  } catch (error) {
    console.log(error);
    return undefined;
  }
});

ipcMain.handle('convert-docx-to-html', async (event, filePath) => {
  try {
    const buffer = await fs.promises.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer: buffer });
    return result.value; // The generated HTML content
  } catch (error) {
    console.error('Failed to convert DOCX to HTML:', error);
    throw error; 
  }
});

ipcMain.handle('read-pdf', async (_, filePath) => {
  try {
      const content = fs.readFileSync(filePath);
      const res = await pdf(content);
      return res.text;
  } catch (error) {
      console.log(error);
      return undefined;
  }
});

ipcMain.handle('write', async (_, filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle('spawn-file-dialog', async (_) => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, { properties: ['openFile'] });

    if (canceled) {
      return undefined;
    }

    return filePaths[0];
  } catch (error) {
    console.log(error);
    return undefined;
  }
});

ipcMain.handle('search-text', async (_, phrase, move) => {
  let nextArg = move === "next"?true:false;
  mainWindow.webContents.findInPage(phrase, {
    forward: true,
    findNext: nextArg,
    matchCase: false
  });
});

ipcMain.handle('search-stop', async (_) => {
  mainWindow.webContents.stopFindInPage('clearSelection');
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
