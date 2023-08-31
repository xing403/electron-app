// 预先加载的内容： 渲染进程
import { contextBridge, ipcRenderer } from "electron";
import UtilsTools from "@/electron/utils-tools";


contextBridge.exposeInMainWorld("UtilsTools", UtilsTools);

ipcRenderer.on('main-output', (_event, message, level) => {
  switch (level) {
    case 'error':
      console.error('main-output:', message);
      break;
    case 'warn':
      console.warn('main-output:', message);
      break;
    case 'info':
      console.info('main-output:', message);
      break;
    case 'debug':
      console.debug('main-output:', message);
      break;
    case 'log':
    default:
      console.log('main-output:', message);
  }
});
