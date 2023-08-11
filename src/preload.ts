// 预先加载的内容： 主进程
import { contextBridge } from "electron";

// 可以将主进程中的一些变量注入到渲染进程中，"plotform" 为自定义名称
contextBridge.exposeInMainWorld("plotform", {
  platform: "electron",
  version: process.versions.electron,
  func: () => {
    console.log("electron");
  }
});
// 在 *.vue 或者 *.html 中使用 windows.plotform 即可，查看到注入的值
