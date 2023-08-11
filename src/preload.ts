// 预先加载的内容： 渲染进程
import { contextBridge, ipcRenderer } from "electron";

const sendMessageMain = async (data: any) => {
  let fallback =  await ipcRenderer.invoke("send-message-main", data);
  return fallback;
};
contextBridge.exposeInMainWorld("API", {
  sendMessageMain
});
