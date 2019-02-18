const user_setting_model = require('./database/collections/user_settings/user_settings_model');
const logger = require('./logger/loggerSettings')();
const personalTicketScrapeController = require('./puppeteerScrapes/scrapeControllers/personalTicketScrapeController');
const socketDataProviders = require('./socketDataProviders/socketFunctions');
const ticketUpdateScrapeController = require('./puppeteerScrapes/scrapeControllers/ticketUpdateScrapeController');

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

async function waitFor(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

/**
 * Runs the functions dedicated for data scraping by time interval
 * @param {Object} accessToken 
 * @param {Object} userData 
 */
function intervalFunctions(userData){

    return new Promise( async(resolve, reject) => {

        try {
        
            const userInterval = await getIntervalSettings(userData);
    
            const interval = userInterval == null ? 30000 : userInterval;

            

            while (true) {

                await personalTicketScrapeController(userData);//Scrapes first the data
        
                await Promise.all([socketDataProviders(userData),ticketUpdateScrapeController()])//Then run the queries for the sockets to send out data to frontend

                await waitFor(interval);

                resolve();
                
            }
        
            // await personalTicketScrapeController(userData);//Scrapes first the data
        
            // await Promise.all([socketDataProviders(userData),ticketUpdateScrapeController()])//Then run the queries for the sockets to send out data to frontend
            
            
    
        
            // await setInterval(async ()=>{
        
            //     try {
        
            //         await personalTicketScrapeController(userData);
    
            //         await Promise.all([socketDataProviders(userData), ticketUpdateScrapeController()]);
                    
        
            //     } catch (error) {
        
            //         logger.error(error, "An issue occured while running interval functions ");

            //         reject();
                    
            //     }
                
        
            // }, interval);

            // resolve();
    
        } catch (error) {
    
            logger.error(error, "An issue occured while running interval functions ");

            reject();
    
        }

    });

}

module.exports = intervalFunctions;