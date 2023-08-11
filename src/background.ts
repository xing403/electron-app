// Electron entry file
import { app, BrowserWindow } from 'electron';
import path from 'node:path'

const createWindow = (width = 1400, height = 1000) => {
  const win = new BrowserWindow({
    width,               // 桌面程序的宽度
    height,              //    ... 高度
    webPreferences: {
      // nodeIntegration: true,        // 在渲染过成功使用node api
      // contextIsolation: false,       // 上下文隔离
      // webSecurity: false,         // 浏览器跨域检测
      preload: path.join(__dirname, './preload.js'),  
    },
  });
  win.webContents.openDevTools(); // 打开窗口的调试工具
  return win
}
app.whenReady().then(() => {
  const win = createWindow()
  if (process.argv[2]) {
    win.loadURL(process.argv[2])  // 开发环境
  } else {
    win.loadFile('index.html')  // 生产环境
  }
});
