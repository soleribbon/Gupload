const { app, BrowserWindow, ipcMain, Notification, dialog } = require('electron');
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
  icon: "/Users/admin/Desktop/testingUpdating/IconTemplate.png", 
  

      
    

});

mb.on('ready', () => {
  

  console.log('Started, checking for updates...');




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


autoUpdater.on('checking-for-update', () => {
  dialog.showMessageBox({
    message: 'CHECKING FOR UPDATES!'
  })
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    message: 'UPDATE AVAILABLE!'
  })

  mb.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  console.log('UPDATE DOWNLOADED');
  mb.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  mb.quitAndInstall();
});
