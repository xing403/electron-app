// Electron entry file
import { app, BrowserWindow, ipcMain } from 'electron';
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
    // width,               // 桌面程序的宽度
    // height,              //    ... 高度
    // parent: config?.parent ?? undefined,   // 父窗口
    // modal: config?.modal ?? false,        // 模态窗口
    // show: config?.show ?? true,         // 是否显示
    // frame: config?.frame ?? true,        // 是否显示边框
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
  mainWindow.webContents.send('main-output', 'Output from Electron');
});




