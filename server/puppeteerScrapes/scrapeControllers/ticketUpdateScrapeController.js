const logger = require('../../logger/loggerSettings')();
const scrapeTicketData = require('../webLookUps/checkWholeTicketDetails/checkWholeTicketDetailsPuppeteer');
const workNotedataScraper = require('../dataScrapers/ticketUpdateDataScraper/workNoteDataScraper');
const removeOldUpdateLogs = require('../../dbQueries/notificationLogicQueries/removelOldUpdateLogs');
const insertTicketUpdateLogs = require('../../dbQueries/notificationLogicQueries/insertTicketUpdateLogs');
const { updated_data } = require('../../cachedData/updatedData/updatedData');

/**
 * Processes the scraping of data from worknote update
 * as reference if ticket should be updated
 */
function ticketUpdateScrapeController() {

    return new Promise( async(resolve, reject) => {

        try {            

            const updatedData = await updated_data();

            const chunkedData = await chunkQueries(5, updatedData);

            const ticketToBeUpdated = [];

            const data = await chunkedData.reduce( async(accumulator, currentValue) => {

                const accum = await accumulator;

                const arrFuncs = currentValue.reduce((acc, curVal) => {

                    ticketToBeUpdated.push(curVal.tckt_nmbr);

                    return [...acc, scrapeTicketData(curVal.tckt_nmbr)];

                }, []);

                const result = await Promise.all(arrFuncs);

                const scrapeFuncs = result.reduce((acc, curVal) => {

                    return [...acc, workNotedataScraper(curVal)];

                }, []);

                const extractedData = await Promise.all(scrapeFuncs);

                const spreadedData = extractedData.reduce((cur, val) => {

                    return [...cur, ...val];
                    
                }, []);

                return [...accum, ...spreadedData];

            }, Promise.resolve([]));

            await removeOldUpdateLogs(ticketToBeUpdated); 

            await insertTicketUpdateLogs(data);

            resolve();
            
        } catch (error) {

            logger.error(error, 'An issue occured in workNoteDataScraper function');
            
            reject();

        }

    })

}


/**
 * Divides the result of the query to chunks
 * @param {*} chunkBy  - individual Chunk length
 * @param {*} data - data to be divided to chunks
 */
async function chunkQueries(chunkBy , data) {

    try {

        const chunkArr = [...Array(Math.ceil(data.length / chunkBy))];

        const batchedResult = [];

        for (let index = 0; index < (chunkArr.length * chunkBy); index += chunkBy) {
            
            batchedResult.push(data.slice(index, index+chunkBy));

        }

        return batchedResult;

    } catch (error) {
        
        logger.error(error, 'An error occured in chunkQueries function');

    }

}

module.exports = ticketUpdateScrapeController;