// 预先加载的内容： 渲染进程
import { contextBridge, ipcRenderer } from "electron";

const sendMessageMain = async (data: any) => {
  let fallback = await ipcRenderer.invoke("send-message-main", data);
  return fallback;
};
contextBridge.exposeInMainWorld("API", {
  sendMessageMain
});

ipcRenderer.on('main-output', (_event, message, level) => {
  switch (level) {
    case 'error':
      console.error('main-output:', message); // 输出内容到渲染进程的控制台
      break;
    case 'warn':
      console.warn('main-output:', message); // 输出内容到渲染进程的控制台
      break;
    case 'info':
      console.info('main-output:', message); // 输出内容到渲染进程的控制台
      break;
    case 'debug':
      console.debug('main-output:', message); // 输出内容到渲染进程的控制台
      break;
    case 'log':
    default:
      console.log('main-output:', message); // 输出内容到渲染进程的控制台
      break;

  }
});
