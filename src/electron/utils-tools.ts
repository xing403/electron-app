import { clipboard } from "electron";

// 内容复制到粘贴板
export const copyTextToClipboard = async (data: string) => clipboard.writeText(data);
// 获取剪贴板中的值
export const getClipboardText = async () => clipboard.readText()


export default {
  copyTextToClipboard,
  getClipboardText
}
