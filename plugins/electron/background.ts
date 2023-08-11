// Electron entry file
import { app, BrowserWindow, globalShortcut } from 'electron';
import WinState from 'electron-win-state'
import type { BrowserWindowConstructorOptions } from 'electron';
import path from 'path'

const winState = new WinState({
  defaultWidth: 1400,
  defaultHeight: 1000
})
const createWindow = (config?: BrowserWindowConstructorOptions) => {
  const win = new BrowserWindow({
    ...config,
    ...winState.winOptions,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  });
  winState.manage(win)
  win.webContents.openDevTools(); // 打开窗口的调试工具
  return win
}
app.whenReady().then(() => {
  const mainWindow = createWindow()
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2])  // 开发环境
  } else {
    mainWindow.loadFile('index.html')  // 生产环境
  }
})




