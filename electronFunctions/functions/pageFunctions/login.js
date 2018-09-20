const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
//Opens the window for the login window
let loginWin;

module.exports = function (win){
    loginWin = new BrowserWindow({width: 382, 
                height: 323 ,
                alwaysOnTop: false,
                parent: win,
                modal: true,
                frame: false,
                resizable: true,
                useContentSize: true,
                minimizable: false,
                maximizable: false,
                icon: __dirname + '/img/ticket_monitor.ico'});

    loginWin.loadFile(path.resolve(__dirname, './../../../public/login.html'));
    loginWin.show();
    loginWin.webContents.openDevTools();
    loginWin.on('closed', ()=>{
        loginWin = null;
    });

    ipcMain.on('close-login', ()=>{
        
        if (loginWin != null) {
            loginWin.close();    
        }
        
    });
}