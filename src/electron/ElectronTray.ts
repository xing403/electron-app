import { Tray, nativeImage } from 'electron';
import { BrowserWindow } from 'electron';
import path from 'path';
export const createTray = (win: BrowserWindow) => {
  const iconPath = path.join(__dirname, 'icon.png');
  const trayIcon = nativeImage.createFromPath(iconPath);
  const tray = new Tray(trayIcon);
  tray.setToolTip('This is my application.');
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show();
  })
};
