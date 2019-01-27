const user_setting_model = require('./database/collections/user_settings/user_settings_model');
const logger = require('./logger/loggerSettings')();
const scrapePersonalRecord = require('./puppeteerScrapes/dataScrapers/personalRecords/scrapeTicketData');
const socketDataProviders = require('./socketDataProviders/socketFunctions');

/**
 * Gets the interval set by user in the database
 */
function getIntervalSettings (user_data){

    return new Promise(async (resolve, reject)=>{
        
        try {

            const user_settings = await user_setting_model();

            const defined_setting = await user_settings.findOne({user_id: user_data._id});

             if  (defined_setting == null){
                resolve(defined_setting);
            }else {
                resolve()
            }

            // resolve();
            
        } catch (error) {

            logger.error(error, "An issue occured while initializing interval settings");

            reject(error);

        }

    })
    

}

/**
 * Runs the functions dedicated for data scraping by time interval
 * @param {Object} accessToken 
 * @param {Object} userData 
 */
async function intervalFunctions(accessToken, userData){

    try {
        
        const userInterval = await getIntervalSettings(userData);

        const interval = userInterval == null ? 30000 : userInterval;
    
        await scrapePersonalRecord(accessToken, userData);//Scrapes first the data
    
        await socketDataProviders();//Then run the queries for the sockets to send out data to frontend
    
        setInterval(async ()=>{
    
            try {
    
                await scrapePersonalRecord(accessToken, userData);
    
                await socketDataProviders(userData);
                
    
            } catch (error) {
    
                logger.error(error, "An issue occured while running interval functions ");
                
            }
            
    
        }, interval);

    } catch (error) {

        logger.error(error, "An issue occured while running interval functions ");

    }

   

}

module.exports = intervalFunctions;