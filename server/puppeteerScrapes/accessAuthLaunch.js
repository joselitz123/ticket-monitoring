const launchPuppeteer = require('./launchPuppeteer');


module.exports = function(username, password) { 
    
    
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await launchPuppeteer();
            const page = await browser.newPage();
            await page.setViewport({width: 1600, height: 800});
            await page.goto('https://fedauth.pg.com/idp/SSO.saml2?SAMLRequest=nVJNT9swGP4rke9JmtA1qdVU6lpNVCoQkW6H3dz4dWrJsY1fp8C%2FJ7hFwAE07Wo%2Ffj69QNar3NLV4I%2F6Hh4GQB899UojPd9UZHCaGoYSqWY9IPUtbVY3O5onE2qd8aY1ikQrRHBeGr02GoceXAPuJFv4fb%2BryNF7izRNbdcpc2AKtAdnnURI8AyLtXlMWtOnmp0s6yDhhkSb0YzU7JX1nUMAZ6PZxHYBL7lNm%2BYuCW5J9Mu4FkKYigimEEi03VSkuV0X5VzA1VwIcTWdsZnI57OymB54UfCSTw7tCMSaIcoTvD9FHGCr0TPtK5JPsiLO8jib7yclzTP6I0%2Bms%2FIviepLDT%2Bl5lJ333d2OIOQXu%2F3dVzfNftAcJIc3O2I%2Fu%2B6%2FoDDUNWoQpaL0AgNEdzHSb93x952JMt%2Ft7FIP4pdpC19TbPd1EbJ9jlaKWUe1w6YHxN6N0AYq2f%2Baz9ZkoUTyWMRoHTQaKGVQgIn6fIi%2B%2Fn3Ll8A&RelayState=https%3A%2F%2Fpgglobalenterprise.service-now.com%2Fnavpage.do', {timeout: 0}).catch(()=>{
                console.log('no reponse received on the first link');
            });
            
            await page.$eval('#username', (el, username)=>{el.value = username}, username);
            await page.$eval('#password', (el, password)=>{el.value = password}, password);        
            Promise.all([page.click('#loginButton'), page.waitForNavigation()])
            .then(async ()=>{
                if (await page.$('#username')) {
                    await page.close();
                    resolve({auth: false, msg: 'Incorrect credentials'});
                }
            });
            await page.waitForNavigation();
            await page.waitForNavigation();
            await page.close();
            resolve({auth: true}); 
       
        } catch (error) {

            resolve({auth: false, msg: 'An error occured while logging in'});
            console.log(error);
        }
                  
    });

}