const { app, ipcMain, Notification, dialog } = require('electron');
const { menubar } = require('menubar');
const { autoUpdater } = require('electron-updater');





const mb = menubar({
	browserWindow: { 

    width: 400, 
    height: 500, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    

  },
  icon: "/Users/admin/Desktop/testingUpdating/IconTemplate.png", 
  

      
    

});

mb.on('ready', () => {
  
   
  mb.showWindow();

  console.log('Started, checking for updates...');

  const notification = {
    title: 'Gupload',
    body: 'GUPLOAD HAS LAUNCHED - CHECK YOUR MENU BAR'
  }
  new Notification(notification).show()


  

  

  // autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.checkForUpdates()



});

mb.on('after-create-window', () => { //after window is created

  //mb.window.webContents.openDevTools(); //REMOVE THIS FOR PRODUCTION!!

  
  
  
  
  

});

mb.on('window-all-closed', () => {
  

});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() }); //reads app version and sends it to main window
  
});




autoUpdater.channel = 'latest';
autoUpdater.allowDowngrade = false;
autoUpdater.autoDownload = true;


let options = {
  type: 'question',
  buttons: ['Okay'],
  defaultId: 0,
  title: 'Question',
  message: 'Gupload - New Update Downloaded.',
  detail: 'Please restart for updates to take effect!',
};

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(options).then((data) => {

    if (data.response === 0){ //restart and apply
      mb.showWindow();
 

    }else{

    }
    
  });

  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() }); //reads app version and sends it to main window
  });
})

autoUpdater.on('checking-for-update', () => {


  

  
})

let options2 = {
  type: 'question',
  buttons: ['Dismiss'],
  message: 'Gupload - Update Available!',
  detail: 'Update will be automatically installed. You can close this window.',
};
autoUpdater.on('update-available', () => {
  dialog.showMessageBox(options2);

  
})

autoUpdater.on('error', (error) => {
  autoUpdater.logger.debug(error)
})



  // let response = dialog.showMessageBox(options)