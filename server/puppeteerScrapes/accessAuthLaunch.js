const launchPuppeteer = require('./launchPuppeteer');

module.exports.checkAuth = function(){
    
}

module.exports = function() { 

    return new Promise(async (resolve, reject) => {
        try {
            const browser = await launchPuppeteer();
            const page = await browser.newPage();
            await page.setViewport({width: 1600, height: 800});
            await page.goto('https://fedauth.pg.com/idp/SSO.saml2?SAMLRequest=nVJNT9swGP4rke9JmtA1qdVU6lpNVCoQkW6H3dz4dWrJsY1fp8C%2FJ7hFwAE07Wo%2Ffj69QNar3NLV4I%2F6Hh4GQB899UojPd9UZHCaGoYSqWY9IPUtbVY3O5onE2qd8aY1ikQrRHBeGr02GoceXAPuJFv4fb%2BryNF7izRNbdcpc2AKtAdnnURI8AyLtXlMWtOnmp0s6yDhhkSb0YzU7JX1nUMAZ6PZxHYBL7lNm%2BYuCW5J9Mu4FkKYigimEEi03VSkuV0X5VzA1VwIcTWdsZnI57OymB54UfCSTw7tCMSaIcoTvD9FHGCr0TPtK5JPsiLO8jib7yclzTP6I0%2Bms%2FIviepLDT%2Bl5lJ333d2OIOQXu%2F3dVzfNftAcJIc3O2I%2Fu%2B6%2FoDDUNWoQpaL0AgNEdzHSb93x952JMt%2Ft7FIP4pdpC19TbPd1EbJ9jlaKWUe1w6YHxN6N0AYq2f%2Baz9ZkoUTyWMRoHTQaKGVQgIn6fIi%2B%2Fn3Ll8A&RelayState=https%3A%2F%2Fpgglobalenterprise.service-now.com%2Fnavpage.do').catch(()=>{
                console.log('no reponse received on the first link');
            });
            await page.$eval('#username', (el)=>{el.value = 'phala.jl'});
            await page.$eval('#password', (el)=>{el.value = 'Joselitz1996'});
            await page.click('#loginButton');
            await page.waitForNavigation();
            
            await page.goto('https://pgglobalenterprise.service-now.com/incident.do?sys_id=0e6960c5db90a708b9d5f3451d961976&sysparm_record_target=task&sysparm_record_row=2&sysparm_record_rows=13&sysparm_record_list=active%3Dtrue%5Eassigned_to%3Djavascript%3AgetMyAssignments%28%29%5EORsys_created_by%3Dphala.jl%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item%5EORDERBYsys_updated_on').catch(()=>{
                console.log('no responsed received on the second link');
            });
            await page.waitForNavigation();
            page.close();
            resolve(true);
            // page2 = await browser.newPage();
            // await page2.setViewport({width: 1600, height: 800});
            // await page2.goto('https://pgglobalenterprise.service-now.com/incident.do?sys_id=INC1666350&sysparm_record_target=task&sysparm_record_row=2&sysparm_record_rows=13&sysparm_record_list=active%3Dtrue%5Eassigned_to%3Djavascript%3AgetMyAssignments%28%29%5EORsys_created_by%3Dphala.jl%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item%5EORDERBYsys_updated_on', {waitUntil: 'networkidle0'});                                
            // resolve(await page2.content());    
            
            
            
        } catch (error) {
            console.log(error);
        }
                  
    });

}