const { Menu, ipcMain, session } = require('electron');
const loadLoginWin = require('./../functions/pageFunctions/login');
const loadRegisterwin = require('./../functions/pageFunctions/register');
const Store = require('electron-store');
const store = new Store();

// sets the menu item
module.exports = function (win){
        const menu = Menu.buildFromTemplate([{
            label: 'Account',
            submenu: [{
                id: 'login',
                label: 'Login',
                click: ()=>{
                loadLoginWin(win);
                },
            },
            {
                id: 'register',
                label: 'Register',
                click: ()=>{
                loadRegisterwin(win);
                },
            },
            {
                id: 'logout',
                label: 'Logout',
                click: ()=>{
                    logout();
                },
                visible: false
            }
            ],
        },  
        {
            label: 'Info'
        }
        ]);
        //sets the application munu during actual rendering
        Menu.setApplicationMenu(menu);

        if (store.get('access_token') != undefined) {
            setMenuToLoggedIn();
        }
        //changes the menu and sets/saves the token to local storage that was received from authentication
        ipcMain.on('isAuthenticated', (event, data)=>{
            setMenuToLoggedIn();
            store.set('access_token', data);
        });

        function setMenuToLoggedIn(){
            menu.getMenuItemById('login').visible = false;      
            menu.getMenuItemById('register').visible = false;      
            menu.getMenuItemById('logout').visible = true;   
        }
        
        function logout(){
            menu.getMenuItemById('login').visible = true;      
            menu.getMenuItemById('register').visible = true;      
            menu.getMenuItemById('logout').visible = false;  
            store.delete('access_token');
        }

        

        
}
