const launchPuppeteer = require('./launchPuppeteer');
const puppeteer = require('puppeteer');
const user_model = require('../database/collections/users/user_model');
const logger = require('../logger/loggerSettings')();
const _ = require('lodash');


/**
 * Launches the authentication and other setup to begin data scraping
 */
module.exports = function() { 
    
    return new Promise(async(resolve, reject)=>{
        try {

            browser = await puppeteer.launch({args: [`--proxy-server='direct://'`, `--proxy-bypass-list=*`], headless: false});

            const page = await browser.newPage();
            
            await page.setViewport({width: 1600, height: 800});
            
            await page.goto('https://pgglobalenterprise.service-now.com/auth_redirect.do?sysparm_url=https%3A%2F%2Ffedauth.pg.com%2Fidp%2FSSO.saml2%3FSAMLRequest%3DnVJNT9swGP4rke9JmtA1qdVU6lpNVCoQkW6H3dz4dWrJsY1fp8C%252FJ7hFwAE07Wo%252Ffj69QNar3NLV4I%252F6Hh4GQB899UojPd9UZHCaGoYSqWY9IPUtbVY3O5onE2qd8aY1ikQrRHBeGr02GoceXAPuJFv4fb%252BryNF7izRNbdcpc2AKtAdnnURI8AyLtXlMWtOnmp0s6yDhhkSb0YzU7JX1nUMAZ6PZxHYBL7lNm%252BYuCW5J9Mu4FkKYigimEEi03VSkuV0X5VzA1VwIcTWdsZnI57OymB54UfCSTw7tCMSaIcoTvD9FHGCr0TPtK5JPsiLO8jib7yclzTP6I0%252Bms%252FIviepLDT%252Bl5lJ333d2OIOQXu%252F3dVzfNftAcJIc3O2I%252Fu%252B6%252FoDDUNWoQpaL0AgNEdzHSb93x952JMt%252Ft7FIP4pdpC19TbPd1EbJ9jlaKWUe1w6YHxN6N0AYq2f%252Baz9ZkoUTyWMRoHTQaKGVQgIn6fIi%252B%252Fn3Ll8A%26RelayState%3Dhttps%253A%252F%252Fpgglobalenterprise.service-now.com%252Fnavpage.do', {timeout: 0}).catch(err=>{
                
                logger.error('Error occured while navigating login page of SNow', err);

            });

            
            await page.on('framenavigated', async ()=>{
                
                if (page.url().indexOf('https://pgglobalenterprise.service-now.com/external_logout_complete.do') != -1) {

                    await page.goto('https://pgglobalenterprise.service-now.com/nav_to.do?uri=%2Fhome.do', {timeout: 0})
                        .catch((err)=>{
                            
                            logger.error(err, 'Issue encountered maybe due to network');
                            console.log(`An error occured ${err}`);

                        });

                    await page.waitFor('.navpage-header-content > .dropdown > #user_info_dropdown > div > .user-name', {timeout: 0}).catch(err=>{
                        logger.error(err, `Issue encountered while fetching the user's name`);
                    });

                    const user_name = await page.$eval('.navpage-header-content > .dropdown > #user_info_dropdown > div > .user-name', e=>e.innerHTML);

                    let cookies = await page.cookies('https://fedauth.pg.com');
                
                    let pgcookies = await page.cookies('https://pgglobalenterprise.service-now.com');
                    
                    const Users = await user_model();

                    const user = await Users.findOne({name: user_name});

                    

                    const browserCookies = await [...cookies, ...pgcookies];
                    
                    

                    if (await user == null) {

                        setTimeout(async ()=>{
                        
                            page.close();
                            
                        }, 4000);

                        const page2 = await browser.newPage();

                        await page2.goto(`https://pgglobalenterprise.service-now.com/sys_user_list.do?sysparm_target=incident.caller_id&sysparm_target_value=c8387ba54fbb0e004679cf5d0210c7d9&sysparm_nameofstack=reflist&sysparm_clear_stack=true&sysparm_element=caller_id&sysparm_reference=sys_user&sysparm_view=sys_ref_list&sysparm_additional_qual=&sysparm_domain_restore=false`, {network: 'networkidle0', timeout: 0})
                        .then(data=>{

                            logger.debug({}, `successfully pulled the users`);

                        })
                        .catch(err=>{

                            logger.error(err, `Issue encountered while trying to search user's credential direct from SNow`);
                            
                        });

                        await page2.evaluate(()=>{
                             document.querySelector('div > .input-group > .input-group-addon > span > select').value = 'name';
                        });

                        await page2.focus('.container-fluid > #sys_user_hide_search > div > .input-group > input');

                        await page2.type('.container-fluid > #sys_user_hide_search > div > .input-group > input', user_name);

                        await page2.keyboard.press('Enter');

                        
                        page2.on('requestfinished', _.debounce(async ()=>{

                            const name_result = await page2.$eval('tbody.list2_body tr:nth-child(1) td:nth-child(3) a', e=>e.innerHTML);

                            const short_name = await page2.$eval('tbody.list2_body tr:nth-child(1) td:nth-child(4)', e=>e.innerHTML);
                            
                            if (await name_result == user_name) {
                                
                                const user = new Users({
                                    name: user_name,
                                    shortname: short_name,
                                    created_at: Date.now(),
                                });

                                user.save()
                                .then(async (data)=>{

                                    logger.info(data, `Successfully saved the credentials if the new user`);

                                    resolve({
                                        browserCookies: browserCookies,
                                        user: data
                                    });
                                })
                                .catch(err=>{

                                    logger.error(err, `An error occured while trying to save user's account`);

                                });

                                await browser.close();
                                

                            }else{

                                reject();

                            }
                        }, 2000) );
                        
                        

                    }else{
                        
                        await browser.close();

                        resolve({
                                browserCookies: browserCookies, 
                                user: user
                            });


                    }

            
                    

                }

            });
            
        
            
        } catch (error) {

            logger.error('An issue occured while trying to login', error);

        }
    });

}



