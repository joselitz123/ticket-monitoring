const logger = require('../../../logger/loggerSettings')();
const cheerio = require('cheerio');

/**
 * Gets the index of the row from the table coming in DOM element extracted
 * @param {array} filters 
 * @param {array} pages 
 */
function getIndexOfRow(filters, pages){

    return new Promise(async (resolve, reject)=>{

        try {
            
            const $ = cheerio.load(pages[0]);
            const filteredIndex = [];

            filters.map((filter)=>{

                filteredIndex.push($(`#task > #task_table > thead > #hdr_task th[name=${filter}]`).index());
                
            });

            resolve(filteredIndex);

        } catch (error) {
            
            logger.error(error, 'Unable to get the index of the columns for the ticket');
            reject(error);

        }

    })


}

module.exports = getIndexOfRow;