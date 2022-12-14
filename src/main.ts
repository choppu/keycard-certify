import { Card } from "./card"

export namespace Main {
  let mainWindow: Electron.BrowserWindow;
  let application: Electron.App;
  let BrowserWindow: any;
  let card: Card;

  export function onWindowAllClosed() {
    application.quit();
  }

  export function onClose(): void {
    mainWindow.destroy();
  }

  export function onReady(): void {
    mainWindow = new BrowserWindow({
      width: 1100, height: 850, minWidth: 1000, minHeight: 845, maximizable: true, webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      }
    });
    mainWindow.removeMenu();
    mainWindow.loadFile(`${__dirname}/../index.html`);
    card = new Card(mainWindow.webContents);
    mainWindow.webContents.once("dom-ready", () => {
      card.start();
    });
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', Main.onClose);
  }

  export function main(app: Electron.App, browserWindow: typeof BrowserWindow): void {
    BrowserWindow = browserWindow;
    application = app;
    application.setName("Keycard Certify");
    application.on('window-all-closed', Main.onWindowAllClosed);
    application.on('ready', Main.onReady);
  }
}