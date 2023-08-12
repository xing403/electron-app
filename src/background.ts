// Electron entry file
import { app, BrowserWindow, Menu } from 'electron';
import WinState from 'electron-win-state'
import type { BrowserWindowConstructorOptions } from 'electron';
import { CustomMenu, ContextMenu } from './electron/ElectronMenu'
import { createTray } from './electron/ElectronTray';
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
  win.webContents.openDevTools()

  winState.manage(win)

  const customMenu = Menu.buildFromTemplate(CustomMenu((args: any) => {  // 自定义顶部菜单
    win.webContents.send('main-output', args)
  }))


  const contextMenu = Menu.buildFromTemplate(ContextMenu()) // 自定义右键菜单
  win.webContents.on('context-menu', () => {
    contextMenu.popup()
  });
  Menu.setApplicationMenu(customMenu)
  createTray(win)
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




