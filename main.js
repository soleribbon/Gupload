const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const { menubar } = require('menubar');
const { autoUpdater } = require('electron-updater');


const mb = menubar({
	browserWindow: { 

    width: 400, 
    height: 500, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    

  },
  icon: "IconTemplate.png", 

      
    

});

mb.on('ready', () => {
  console.log('Started');
  autoUpdater.checkForUpdatesAndNotify();

  const notification = {
    title: 'Gupload',
    body: 'GUPLOAD HAS LAUNCHED - CHECK YOUR MENU BAR'
  }
  new Notification(notification).show()

  // your app code here
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() }); //reads app version and sends it to main window
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});