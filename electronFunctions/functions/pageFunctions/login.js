const axios = require('axios');
const Store = require('electron-store');
const { Notification } = require('electron');
const path = require('path');

module.exports = function (win){
    axios.get('http://localhost:3000/auth/login')
    .then((data)=>{
    
        win.webContents.send('loadUserInfo', data.data);
        
        const iconPath = path.join(__dirname,'../../../public/img/Logo_raw.ico');
        new Notification({
            title: `Welcome ${data.data.name}`,
            body: `We'll inform you once data on your dashboard is ready`,
            icon: iconPath
        }).show();

    })
    .catch(err=>{
        console.log('error occured');
        console.log(err);
    });
}