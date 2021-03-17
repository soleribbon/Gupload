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




  // autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.checkForUpdates()

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


// autoUpdater.on('checking-for-update', () => {
//   dialog.showMessageBox({
//     message: 'CHECKING FOR UPDATES!'
//   })
//   mb.webContents.send('checking-for-update');
// });

// autoUpdater.on('update-available', () => {
//   dialog.showMessageBox({
//     message: 'UPDATE AVAILABLE!'
//   })

//   browserWindow.webContents.send('update_available');
// });
// autoUpdater.on('update-downloaded', () => {
//   dialog.showMessageBox({
//     message: 'Update Downloaded!'
//   })
//   browserWindow.webContents.send('update_downloaded');
// });

// ipcMain.on('restart_app', () => {
//   browserWindow.quitAndInstall();
// });


autoUpdater.channel = 'latest';
autoUpdater.allowDowngrade = false;
autoUpdater.autoDownload = true;

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    message: 'Gupload Update Downloaded - please restart for updates to take effect.'
  })

  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() }); //reads app version and sends it to main window
  });
})

autoUpdater.on('checking-for-update', () => {
  
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    message: 'Gupload Update Available!'
  })
})

autoUpdater.on('error', (error) => {
  autoUpdater.logger.debug(error)
})

  // const options = {
  //   type: 'question',
  //   buttons: ['No, thanks', 'Restart and Apply Update'],
  //   defaultId: 1,
  //   title: 'Question',
  //   message: 'Gupload - New Update Downloaded.',
  //   detail: 'Would you like to restart and apply the update?',
  // };

  // let response = dialog.showMessageBox(options)