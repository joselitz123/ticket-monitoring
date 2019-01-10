const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const menuSetup = require('./../electronFunctions/partials/menu');
const notifications = require('../electronFunctions/partials/notification');


  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.

  
  let win;
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1600, 
                            height: 900 ,
                            minWidth: 800, 
                            minHeight: 600, 
                            icon: __dirname + '/img/Logo_raw.ico'});
  
    // and load the index.html of the app.
    win.loadFile('./public/index.html');
    
    //run application menu setup
    menuSetup(win);

    //import the notification functions
    notifications();

    // added the redux as a devtool
    BrowserWindow.addDevToolsExtension('/Users/jphala/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0');
    BrowserWindow.addDevToolsExtension('/Users/jphala/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.5.0_0');
    win.webContents.openDevTools();

    let server = new BrowserWindow({show: true});
    server.loadFile(path.join(__dirname, './server.html'));
    server.webContents.openDevTools();

    server.on('closed', ()=>{
      server = null;
    });
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.