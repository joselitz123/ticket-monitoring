const launchPuppeteer = require('./launchPuppeteer');
const puppeteer = require('puppeteer');
const user_model = require('../database/collections/users/user_model');
const logger = require('../logger/loggerSettings')();
const _ = require('lodash');
const puppeteerInstance = require('./launchPuppeteer');

/**
 * Launches the authentication and other setup to begin data scraping
 */
module.exports = function() { 
    
    return new Promise(async(resolve, reject)=>{
        try {

            browser = await puppeteerInstance();

            const page = await browser.newPage();
            
            await page.setViewport({width: 1600, height: 800});

            
            await page.goto('https://pgglobalenterprise.service-now.com/navpage.do', {timeout: 0}).catch(err=>{
                
                logger.error(err, 'Error occured while navigating login page of SNow');

            });

            // await page.setRequestInterception(false); // disable request interception due to bug that affected the processing
            await page.on('framenavigated', async ()=>{

                try {

                    if (page.url().indexOf('https://pgglobalenterprise.service-now.com/navpage.do') != -1) {
                    
                        
                    await page.waitFor('.navpage-header-content > .dropdown > #user_info_dropdown > div > .user-name', {timeout: 0}).catch(err=>{
                        logger.error(err, `Issue encountered while fetching the user's name`);
                    });

                    const user_name = await page.$eval('.navpage-header-content > .dropdown > #user_info_dropdown > div > .user-name', e=>e.innerHTML);

                    // let cookies = await page.cookies('https://fedauth.pg.com');
                
                    // let pgcookies = await page.cookies('https://pgglobalenterprise.service-now.com');
                    
                    const Users = await user_model();

                    const user = await Users.findOne({name: user_name});
                    

                    // const browserCookies = await [...cookies, ...pgcookies];
                    
                    

                    if (user == null) {

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
                                        // browserCookies: browserCookies,
                                        user: data
                                    });
                                })
                                .catch(err=>{

                                    logger.error(err, `An error occured while trying to save user's account`);

                                });

                                await page2.close();
                                

                            }else{

                                reject();

                            }
                        }, 2000) );
                        
                        

                    }else{

                        await page.close();

                        resolve({
                                // browserCookies: browserCookies, 
                                user: user
                            });


                    }

            
                    

                }
                    
                } catch (error) {

                    logger.error(error, 'An issue occured while trying to login');

                    reject(error);
                    
                }

            });
            
        
            
        } catch (error) {

            logger.error(error, 'An issue occured while trying to login');

            reject(error);

        }
    });

}



