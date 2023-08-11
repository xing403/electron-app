// Electron entry file
import { app, BrowserWindow } from 'electron';
app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,               // 桌面程序的宽度
    height: 600,              //    ... 高度
    webPreferences: {
      nodeIntegration: true,        // 在渲染过成功使用node api
      contextIsolation: false,
      webSecurity: false,         // 关闭浏览器跨域检测
    },
  });
  // win.webContents.openDevTools(); // 打开窗口的调试工具

  if (process.argv[2]) {
    win.loadURL(process.argv[2])  // 开发环境
  } else {
    win.loadFile('index.html')  // 生产环境
  }
});
