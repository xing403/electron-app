// Electron entry file
import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
import WinState from 'electron-win-state'
import type { BrowserWindowConstructorOptions } from 'electron';
import { CustomMenu, ContextMenu } from './ElectronMenu'
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

  const customMenu = Menu.buildFromTemplate(CustomMenu('hi', (args) => {  // 自定义顶部菜单
    win.webContents.send('main-output', args)
  }))

  const contextMenu = Menu.buildFromTemplate(ContextMenu('hi', (args) => { })) // 自定义右键菜单
  win.webContents.on('context-menu', (e, props) => {
    contextMenu.popup()
  });
  Menu.setApplicationMenu(customMenu)
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




