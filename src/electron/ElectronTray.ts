import { Tray, nativeImage } from 'electron';
import { BrowserWindow } from 'electron';
import path from 'path';
export const createTray = (win: BrowserWindow) => {
  const iconSrc = path.join(__dirname, 'images/icon.png');
  const trayIcon = nativeImage.createFromPath(iconSrc);
  const tray = new Tray(trayIcon);
  tray.setToolTip('This is my application.');
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show();
  })
};
