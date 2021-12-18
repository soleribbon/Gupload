const { app, ipcMain, Notification, dialog, Tray } = require('electron');
const { menubar } = require('menubar');
const { autoUpdater } = require('electron-updater');
const path = require('path');



const mb = menubar({
  showDockIcon: true, //hide dock icon from the start !!ENABLE FOR FINAL VERSION

	browserWindow: { 

    width: 400, 
    height: 500,
    alwaysOnTop: true, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true

    },
    

  },
  icon: path.join(__dirname, 'TrayIconTemplate.png'), 
  

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

  
  autoUpdater.checkForUpdates(); 


 

  
  
  

});






mb.on('after-hide', () => { //when window is hidden again

  app.dock.hide(); //hide dock icon !!ENABLE FOR FINAL VERSION


  

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

  //anything to run when checking for updates? nope
  
})

let options2 = {
  type: 'question',
  buttons: ['Dismiss'],
  message: 'Gupload - Update Available!',
  detail: 'Update will be automatically installed. You can close this window.',
};
autoUpdater.on('update-available', () => {
  dialog.showMessageBox(options2);

});

autoUpdater.on('error', (error) => {
  autoUpdater.logger.debug(error)
});




