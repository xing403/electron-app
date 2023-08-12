// 预先加载的内容： 渲染进程
import { contextBridge, ipcRenderer, clipboard } from "electron";
const sendMessageMain = async (data: any) => {
  let fallback = await ipcRenderer.invoke("send-message-main", data);
  return fallback;
};
const copyTextToClipboard = async (data: string) => {
  clipboard.writeText(data);
};
// 获取剪贴板中的值
const getClipboardText = async () => {
  return clipboard.readText();
};

contextBridge.exposeInMainWorld("SYSTEM_API", {
  sendMessageMain,
  copyTextToClipboard,
  getClipboardText
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
