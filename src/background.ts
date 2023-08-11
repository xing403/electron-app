// Electron entry file
import { app, BrowserWindow, ipcMain } from 'electron';
import type { BrowserWindowConstructorOptions } from 'electron';
import path from 'path'


const createWindow = (width = 1400, height = 1000, config?: BrowserWindowConstructorOptions) => {
  const win = new BrowserWindow({
    width,               // 桌面程序的宽度
    height,              //    ... 高度
    parent: config?.parent ?? undefined,   // 父窗口
    modal: config?.modal ?? false,        // 模态窗口
    show: config?.show ?? true,         // 是否显示
    frame: config?.frame ?? true,        // 是否显示边框
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  });
  //  win.webContents.openDevTools(); // 打开窗口的调试工具
  return win
}
app.whenReady().then(() => {
  const mainWindow = createWindow(800, 800)
  const secondWindow = createWindow(600, 600, {
    parent: mainWindow,
    modal: true,
    frame: false
  })

  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2])  // 开发环境
  } else {
    mainWindow.loadFile('index.html')  // 生产环境
  }

  secondWindow.loadURL(`http://localhost${process.argv[2].split('localhost')[1]}/#/login`)

  ipcMain.handle("send-message-main", (_event, data: any) => {
    console.log(_event, data)
    return "main receive the message";
  });
});

