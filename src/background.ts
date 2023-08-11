// Electron entry file
import { app, BrowserWindow, dialog } from 'electron';
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
  // 窗口中鼠标右键事件
  // mainWindow.webContents.on('context-menu', (e, props) => {
  //   // dialog.showOpenDialog({
  //   //   buttonLabel: '选择文件',
  //   //   properties: ['openFile', 'multiSelections'],
  //   //   defaultPath: path.join(__dirname, ''),  // default open path
  //   //   // filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'ico', 'jpeg'] }], // need file type
  //   //   // notify: openFile and openDirectory can't be used together. and OpenDiretory takes precedence over openFile
  //   //   // properties: ['openFile', 'multiSelections', 'openDirectory', 'showHiddenFiles'], // can options type
  //   // }).then(({ filePaths }) => { // 获取选择的文件路径
  //   //   mainWindow.webContents.send('main-output', { x, y, filePaths })
  //   // })
  //   // dialog.showSaveDialog({}).then(res => {
  //   //   mainWindow.webContents.send('main-output', res)
  //   // })
  //   dialog.showMessageBox({
  //     type: 'info',
  //     buttons: ['取消', '确定', '最小化'],
  //     title: '提示',
  //     message: '是否退出程序',
  //     // detail: '这是一个详细信息',
  //   }).then((res) => {
  //     mainWindow.webContents.send('main-output', res)
  //   })
  // })
})




