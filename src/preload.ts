// 预先加载的内容： 渲染进程
import { contextBridge, ipcRenderer } from "electron";

const sendMessageMain = async (data: any) => {
  let fallback =  await ipcRenderer.invoke("send-message-main", data);
  return fallback;
};

// 可以将主进程中的一些变量注入到渲染进程中，"plotform" 为自定义名称
// contextBridge.exposeInMainWorld("plotform", {
//   platform: "electron",
//   version: process.versions.electron,
//   func: () => {
//     console.log("electron");
//   }
// });
contextBridge.exposeInMainWorld("API", {
  sendMessageMain
});
// 在 *.vue 或者 *.html 中使用 windows.plotform 即可，查看到注入的值
