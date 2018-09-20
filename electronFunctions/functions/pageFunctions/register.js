const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
//Opens the window for the register window

/**
 * Loads the register for GUI
 * @param {Object} win 
 */
function loadRegisterWin(win){

    let RegWin = new BrowserWindow({frame: false, 
                                    parent: win,
                                    modal: true,
                                    icon: __dirname + '../../../public/img/ticket_monitor.ico'});

    RegWin.loadFile(path.resolve(__dirname, '../../../public/register.html'));
    RegWin.show();
    RegWin.on('show', ()=>{
      console.log('show working');
    });
    RegWin.on('closed', ()=>{

      RegWin = null;

    });
    
    RegWin.webContents.openDevTools();

    ipcMain.on('close-register', ()=>{
      if (RegWin != null) {
        RegWin.close();  
      }
    });

}

module.exports = loadRegisterWin;