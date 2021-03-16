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
  icon: "/Users/admin/Desktop/testingUpdating/IconTemplate.png", 
  

      
    

});

mb.on('ready', () => {
  

  console.log('Started, checking for updates...');



  // autoUpdater.setFeedURL({
  //   provider: 'github',
  //   owner: 'soleribbon',
  //   repo: 'https://github.com/soleribbon/Gupload.git',
  //   token: '282836393d7532bd631e37e2a4966997289e6056',
  // });
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
  console.log('!UPDATE AVAILABLE!');

  mb.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  console.log('UPDATE DOWNLOADED');
  mb.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  mb.quitAndInstall();
});
